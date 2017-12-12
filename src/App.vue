<template>
  <div id="app">
    <!-- <Cover :src="bg"> -->
    <Cover>
      <div id="cover-contain">
        <h1>偏鄉醫療數據</h1>
        <br/>
        <div id="cover-text">俠醫林杰樑逝世1500天，遺孀譚敦慈不僅持續經營林杰樑的臉書、回答網友問題，家裡他的一切衣物，也還在原位，每天一人一杯咖啡的習慣，更不曾停止。許多人要譚敦慈「放下」，別沉溺過往。「我不懂要放下什麼，他永遠是我的先生，我或許看不到他，但不會刻意忘記他」，她說，用遺忘來道別，何其殘忍。</div>
        <br/>
        <Share />
      </div>
    </Cover>
    <div class="menu">
      <div class="menu-button">醫療資源可近性</div>
      <div class="menu-button">安寧資源</div>
      <div class="menu-button">相對論</div>
    </div>
    <div id="map-contain">
      <div id="map-menu" :class="{open: mapmenu}">
        <div class="item" @click="menuClick(index)" v-for="(item, index) in main">{{item.location}}</div>
      </div>
      <div id="map-tooltip" :class="{show: tooltipShow}">
        <div class="tooltip-title">{{selectedCountry.location}}</div>
        <div id="tooltip-detail">
          <div class="detail">人口數<span>{{selectedCountry.population}}人</span></div>
          <div class="detail">老年人口數<span>{{selectedCountry.old}}人</span></div>
          <div class="detail">醫院總數<span>{{selectedCountry.hospital}}家</span></div>
          <div class="detail">每萬人口病床數<span>{{selectedCountry.beds}}床</span></div>
          <div class="detail noborder">每萬人口職業醫事人口數<span>{{selectedCountry.employee}}人</span></div>
        </div>
      </div>
      <div id="map-select" :class="{open: mapmenu}" @click="expand">
        <img src="./assets/search.png">
        <span>{{selectedText}}</span>
      </div>
      <div id="map"></div>
    </div>
    <div style="height:10000px;">
    </div>
  </div>
</template>

<script>

import Cover from '@/components/CoverFixedBg'
import { Share } from 'udn-newmedia-vue-components'

import bg from '@/assets/bg.jpg'

export default {
  name: 'app',
  data: function(){
    return {
      main: [
        {location: '新北市', population: 3979208, old: 465909, hospital: 10, beds: 69, employee: 68},
        {location: '臺北市', population: 2695704, old: 419130, hospital: 20, beds: 93, employee: 168},
        {location: '桃園市', population: 2147763, old: 219425, hospital: 20, beds: 70, employee: 96},
        {location: '臺中市', population: 2767239, old: 301904, hospital: 16, beds: 76, employee: 115},
        {location: '臺南市', population: 1886033, old: 259701, hospital: 10, beds: 68, employee: 108},
        {location: '高雄市', population: 2779371, old: 373604, hospital: 10, beds: 78, employee: 120},
        {location: '宜蘭縣', population: 457538, old: 67808, hospital: 3, beds: 85, employee: 98},
        {location: '新竹縣', population: 547481, old: 64040, hospital: 1, beds: 44, employee: 51},
        {location: '苗栗縣', population: 559189, old: 82771, hospital: 3, beds: 59, employee: 64},
        {location: '彰化縣', population: 1287146, old: 182962, hospital: 5, beds: 59, employee: 90},
        {location: '南投縣', population: 505163, old: 80135, hospital: 1, beds: 65, employee: 73},
        {location: '雲林縣', population: 694873, old: 118764, hospital: 5, beds: 56, employee: 73},
        {location: '嘉義縣', population: 515320, old: 92234, hospital: 1, beds: 66, employee: 83},
        {location: '屏東縣', population: 835792, old: 127016, hospital: 7, beds: 68, employee: 86},
        {location: '臺東縣', population: 220802, old: 33060, hospital: 1, beds: 66, employee: 89},
        {location: '花蓮縣', population: 330911, old: 48649, hospital: 3, beds: 132, employee: 130},
        {location: '澎湖縣', population: 103263, old: 15579, hospital: 0, beds: 53, employee: 64},
        {location: '基隆市', population: 372100, old: 51949, hospital: 3, beds: 78, employee: 91},
        {location: '新竹市', population: 437337, old: 48141, hospital: 2, beds: 64, employee: 115},
        {location: '嘉義市', population: 269874, old: 36268, hospital: 5, beds: 146, employee: 198},
      ],
      bg: bg,
      mapmenu: false,
      tooltipShow: false,
      selectedText: '選擇縣市',
      selectedCountry: {location: '總計', population: 23539816, old: 3106105, hospital: 115, beds: 69, employee: 103}
    }
  },
  mounted: function(){
    var w = $(window).width()
    var h = $(window).height()

    var svg = d3.select('#map').append('svg').attr({'width' : w, 'height': h});

    svg.append('image').attr({'xlink:href': './static/taiwan.png', 'x': 0, 'y': 0, 'width': w, 'height': h})    

    d3.json("./static/country.json", function(data_json){

      var topo = topojson.feature(data_json, data_json.objects.counties);

      var prjScale = 0;

      var prj = d3.geo.mercator().center([120.971864, 23.400998])
              .scale(7800).translate([w/2, h/2 + 50]);

      var path = d3.geo.path().projection(prj);

      var g = svg.append('g').attr('id', 'map-g');

      g.selectAll('path')
          .data(topo.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', function(d){
            // console.log(d)
            return '#FFFFFF';
          })
          .attr('fill-opacity', '0')
          // .attr('fill-opacity', '0.55')
          .attr('stroke', '#B5B5B6')
          .attr('stroke-opacity', '1')
          .attr('stroke-width', '0.5')
          .attr('id', function(d){
            // console.log(d);
            // return d['properies']['COUNTYNAME'];
          });

      d3.csv('./static/hospital.csv', function(data){

        var circle = svg.selectAll('circle')
          .data(data).enter()
          .append('circle')
          .attr({
            'cx': function(d){
              return prj([d.lat, d.lon])[0]
            },
            'cy': function(d){
              return prj([d.lat, d.lon])[1]
            },
            'r': 0,
            'fill': '#EF4326',
            'fill-opacity': '0.8'
          })

        setTimeout(function(){
          circle.transition()
            .attr({
              'r': 2
            })
        }, 1000)

      })

    })

  },
  methods: {
    menuClick: function(d){
      console.log(this.main[d])
      this.mapmenu = false
      this.selectedText = this.main[d].location
      this.selectedCountry = this.main[d]
      this.tooltipShow = true
    },
    expand: function(){
      console.log(5)
      this.mapmenu = !this.mapmenu
    }
  },
  components: {
    Cover, Share
  }
}
</script>

<style>

svg{
  border: 1px solid black;
}

html, body, #app{
  height: 100%;
}

#cover #cover-contain{
  position: absolute;
  left: 20px;
  top: 130px;
  right: 20px;
  text-shadow: none;
}

#cover h1{
  color: #010101;
  text-shadow: none;
}

#cover-text{
  color: #4D4D4D;
  font-size: 18px;
  line-height: 32px;
}

.menu{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20%;
}

.menu-button{
  width: 265px;
  height: 102px;
  border-radius: 50px;
  background-color: #EF4326;
  box-shadow: -2.8px 1.1px 7px 0 rgba(4, 0, 0, 0.05);
  font-size: 26px;
  display: inline-block;
  line-height: 102px;
  text-align: center;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  margin-top: 30px;
}

#map-contain{
  overflow: hidden;
  position: relative;
  height: 100%;
}

#map{
  transition: all 1.2s ease;
}

#map-menu{
  position: absolute;
  width: 156px;
  background-color: #F4F2F2;
  padding: 18px;
  top: 90px;
  transition: all 0.7s ease;
  transform: translate(-100%, 0);
  height: 600px;
  overflow: scroll;
  z-index: 10;
}

#map-menu.open{
  transform: translate(0, 0);
}

.item{
  font-size: 15px;
  width: 120px;
  line-height: 37px;
  height: 37px;
  color: #828282;
  text-align: center;
}

.item.selected{
  background-color: #F15A24;
  color: #FFFEFE;
}

#map-select{
  position: absolute;
  width: 110px;
  height: 28px;
  left: 20px;
  top: 90px;
  border-bottom: 1px solid #AAAAAA;
  font-size: 15px;
  color: #828282;
  transition: all 0.7s ease;
}

#map-select.open{
  border: none;
  transform: translate(136px, 0)
}

#map-select.open span{
  display: none;
}

#map-select img{
  width: 28px;
  margin-top: -5px;
}

#map-tooltip{
  position: absolute;
  width: 260px;
  height: 215px;
  background-image: url('./assets/tooltips.png');
  background-repeat: no-repeat;
  background-size: 260px 215px;
  bottom: 30px;
  right: 10px;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.7s ease;
}

#map-tooltip.show{
  opacity: 1;
}

.tooltip-title{
  font-size: 18px;
  font-weight: bold;
  color: #4D4D4D;
  line-height: 1;
  margin-top: 5px;
}

#tooltip-detail{
  border-top: 1px solid #000000;
  margin-top: 7px;
  padding-top: 3px;
}

.detail{
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #4D4D4D;
  border-bottom: 1px solid #AAAAAA;
}

.detail.noborder{
  border: none;
}

.detail span{
  position: absolute;
  right: 19px;
  color: #F15A24;
}

</style>
