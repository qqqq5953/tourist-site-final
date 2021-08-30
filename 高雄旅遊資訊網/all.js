let selectDistrict = document.querySelector(".header_select-district");
let data;
let district;

//axios
axios
  .get(
    "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
  )
  .then(function (response) {
    data = response.data.result.records;
    console.log(data);
    showDistrict();
    chooseDistrict();
    popularDistrict();
  });

//呈現行政區選項
function showDistrict() {
  //把zone取出(有重複)
  let zoneRepeat = [];
  data.forEach((item) => {
    zoneRepeat.push(item.Zone);
  });
  //篩出不重複的zone
  district = zoneRepeat.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
  //寫入<select></select>
  let str = "";
  district.forEach(function (item) {
    let defaultSelect = '<option class="" selected>- - 請選擇行政區 - -</option>';
    str += `<option class="district" value="${item}">${item}</option>`;
    selectDistrict.innerHTML = defaultSelect + str;
  });
}

//click請選擇行政區
let spotTitle = document.querySelector(".spot-section_title");
let spotList = document.querySelector(".spot-section_list");
function chooseDistrict() {
  selectDistrict.addEventListener("change", function (e) {
    e.preventDefault();
    if (e.target.value === "- - 請選擇行政區 - -") {
      spotTitle.innerHTML = "";
      spotList.innerHTML = "";
    } else {
      spotTitle.innerHTML = e.target.value;
    }
    district.forEach(function (item) {
      if (e.target.value === item) {
        districtInfo(item);
      }
    });
  });
}

//熱門行政區
let popularSectionBtn = document.querySelectorAll(".popular-section_btn");
function popularDistrict() {
  popularSectionBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target);
      spotTitle.innerHTML = e.target.textContent;
      district.forEach((item) => {
        if (e.target.textContent === item) {
          districtInfo(item);
        }
      });
    });
  });
}

//讀取行政區資料呈現在網頁
function districtInfo(zone) {
  //篩選出對應到select選單的行政區item
  let getDistrict = data.filter(function (item) {
    return item.Zone === zone; //zone="XX區"
  });

  //將篩選出的item渲染到網頁上
  let str = "";
  getDistrict.forEach(function (item) {
    if (item.Ticketinfo === "免費參觀") {
      item.Ticketinfo = "免費參觀";
    } else {
      item.Ticketinfo = "門票請洽官網查詢";
    }
    str += `
			<li class="spot-section_item">
				<header class="spot-section_header text-white">
					<img src="${item.Picture1}" alt="">
					<div class="spot-section_headerInfo">
						<h3 class="spot-section_subtitle mb-0">${item.Name}</h3>
						<span class="spot-section_district">${item.Zone}</span>
					</div>
				</header>
				<div class="spot-section_body">
					<ul class="spot-section_body-list">
						<li class="spot-section_schedule">
							<img class="spot-section_schedule-icon" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_clock.png" alt="">
							<span class="spot-section_schedule-text">${item.Opentime}</span>
						</li>
						<li class="spot-section_address">
							<img class="spot-section_address-icon" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_pin.png">
							<span class="spot-section_address-text">${item.Add}</span>
						</li>
						<li class="spot-section_contact">
							<img class="spot-section_contact-icon" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_phone.png">
							<span class="spot-section_contact-text">${item.Tel}</span>
						</li>
					</ul>
					<div class="spot-section_free">
						<img class="spot-section_free-icon" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_tag.png">
						<span class="spot-section_free-text">${item.Ticketinfo}</span>
					</div>
				</div>
			</li>`;
  });
  spotList.innerHTML = str;
}


