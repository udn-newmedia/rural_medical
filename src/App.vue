<template>
  <div id="app">
    <Indicator color="#EF4326" />
    <Cover :src="bg">
      <div id="cover-contain">
        <h1>偏鄉醫療數據</h1>
      </div>
      <div id="cover-icon">
        <img src="./assets/pill.png">
      </div>
    </Cover>
    <ContentContainer>
      <div id="cover-text">俠醫林杰樑逝世1500天，遺孀譚敦慈不僅持續經營林杰樑的臉書、回答網友問題，家裡他的一切衣物，也還在原位，每天一人一杯咖啡的習慣，更不曾停止。許多人要譚敦慈「放下」，別沉溺過往。「我不懂要放下什麼，他永遠是我的先生，我或許看不到他，但不會刻意忘記他」，她說，用遺忘來道別，何其殘忍。</div>
      <br/>
      <Share />
      <br/>
    </ContentContainer>
    <div class="textbox">
        補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字。
    </div>
    <Section :src="section1" text="醫療資源可近性"/>
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
      <div id="map-select" :class="{open: mapmenu, show: mapShow}" @click="expand">
        <img src="./assets/search.png">
        <span>{{selectedText}}</span>
      </div>
      <div id="svg-contain" :class="{zoomIn: mapScale}">
        <div id="map" :style="{transform: 'translate(' + mapTranslate.x + ', ' + mapTranslate.y + ')'}"></div>
      </div>
    </div>
    <div class="textbox">
      補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字。
    </div>
    <div class="space"></div>
    <div class="textbox">
      補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字。
    </div>
     <div class="space"></div>
    <div class="textbox">
      補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字。
    </div>
    <div class="space"></div>
    <div class="textbox">
      補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字。
    </div>
    <div class="space"></div>
    <div class="textbox">
      補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字補文字。
    </div>
    <div class="space"></div>
    <Section :src="section3" text="醫生病人相對論為什麼我們等不到彼此？"/>
    <ContentContainer background-color="#FFFFFF">
      <h2>一、要看病，到底難在哪？</h2>
      <p><br/></p>
      <p>依仰阿嬤（88），與年邁的先生同住在花蓮縣秀林鄉文蘭村重光部落，距離市區門諾等大醫院約40分鐘車程。三女兒謝美麗（Nanu）今年6月結束市區的美髮店生意，返家與父母同住。</p>
      <p><br/></p>
      <Share />
      <Logo />
      <p><br/></p>
      <Editor>
        <div>製作人、文字：林秀姿</div>
        <div>影音、美術設計：許瑋琳</div>
        <div>攝影：林伯東、劉學聖、侯永全</div>
        <div>網頁製作：鄭偉廷</div>
        <div>監製：董谷音、蔡幸怡</div>
        <div>倡議夥伴：永齡慈善教育基金會</div>
        <div>2017.10.03</div>
      </Editor>
			<p><br/></p>
			<FBComment href="https://udn.com/upf/newmedia/2017_data/ideal/index.html" />
      <p><br/></p>
      <Foot/>
    </ContentContainer>
  </div>
</template>

<script>

import Cover from '@/components/CoverFixedBg'
import Section from '@/components/Section'
import { Indicator, ContentContainer, Share, Editor, Relate, FBComment, Foot, Logo } from 'udn-newmedia-vue-components'

import bg from '@/assets/bg.jpg'

import section1 from '@/assets/section1.jpg'
import section2 from '@/assets/section2.jpg'
import section3 from '@/assets/section3.jpg'

var svg, circle, prj, path

var resouce_leak = ["三重區","蘆洲區","八里區","五股區","林口區","泰山區","竹北市","新豐鄉","湖口鄉","新埔鎮","竹東鎮","寶山鄉","北埔鄉","峨眉鄉","芎林鄉","橫山鄉","關西鎮","尖石鄉","五峰鄉","後龍鎮","西湖鄉","通霄鎮","苑裡鎮","竹南鎮","頭份市","三灣鄉","南庄鄉","造橋鄉","芳苑鄉","二林鎮","埤頭鄉","竹塘鄉","大城鄉","田中鎮","二水鄉","田尾鄉","北斗鎮","溪州鄉","埔里鎮","仁愛鄉","魚池鄉","國姓鄉","草屯鎮","南投市","名間鄉","中寮鄉","竹山鎮","鹿谷鄉","集集鎮","水里鄉","信義鄉","口湖鄉","北港鎮","水林鄉","元長鄉","四湖鄉","虎尾鎮","大埤鄉","土庫鎮","西螺鎮","二崙鄉","崙背鄉","褒忠鄉","臺西鄉","東勢鄉","麥寮鄉","斗六市","林內鄉","莿桐鄉","古坑鄉","斗南鎮","民雄鄉","竹崎鄉","番路鄉","中埔鄉","阿里山鄉","大埔鄉","梅山鄉","大林鎮","溪口鄉","新港鄉","朴子市","六腳鄉","東石鄉","布袋鎮","太保市","鹿草鄉","義竹鄉","旗山區","美濃區","六龜區","甲仙區","杉林區","內門區","茂林區","桃源區","那瑪夏區","枋寮鄉","春日鄉","枋山鄉","獅子鄉","恆春鎮","車城鄉","滿洲鄉","牡丹鄉","馬公市","湖西鄉","白沙鄉","西嶼鄉","望安鄉","七美鄉","關山鎮","池上鄉","海端鄉","鹿野鄉","延平鄉","成功鎮","長濱鄉","東河鄉","大武鄉","達仁鄉","金峰鄉","太麻里鄉","萬榮鄉","鳳林鎮","光復鄉","豐濱鄉","玉里鎮","富里鄉","卓溪鄉","瑞穗鄉"]

export default {
  name: 'app',
  data: function(){
    return {
      main: [
        {location: '新北市', population: 3979208, old: 465909, hospital: 10, beds: 69, employee: 68, x: '-83px', y: '164px'},
        {location: '臺北市', population: 2695704, old: 419130, hospital: 20, beds: 93, employee: 168, x: '-83px', y: '174px'},
        {location: '桃園市', population: 2147763, old: 219425, hospital: 20, beds: 70, employee: 96, x: '-39px', y: '147px'},
        {location: '臺中市', population: 2767239, old: 301904, hospital: 16, beds: 76, employee: 115, x: '20px', y: '53px'},
        {location: '臺南市', population: 1886033, old: 259701, hospital: 10, beds: 68, employee: 108, x: '90px', y: '-109px'},
        {location: '高雄市', population: 2779371, old: 373604, hospital: 10, beds: 78, employee: 120, x: '68px', y: '-161px'},
        {location: '宜蘭縣', population: 457538, old: 67808, hospital: 3, beds: 85, employee: 98, x: '-90px', y: '115px'},
        {location: '新竹縣', population: 547481, old: 64040, hospital: 1, beds: 44, employee: 51, x: '-20px', y: '122px'},
        {location: '苗栗縣', population: 559189, old: 82771, hospital: 3, beds: 59, employee: 64, x: '8px', y: '94px'},
        {location: '彰化縣', population: 1287146, old: 182962, hospital: 5, beds: 59, employee: 90, x: '74px', y: '5px'},
        {location: '南投縣', population: 505163, old: 80135, hospital: 1, beds: 65, employee: 73, x: '8px', y: '-14px'},
        {location: '雲林縣', population: 694873, old: 118764, hospital: 5, beds: 56, employee: 73, x: '81px', y: '-23px'},
        {location: '嘉義縣', population: 515320, old: 92234, hospital: 1, beds: 66, employee: 83, x: '70px', y: '-54px'},
        {location: '屏東縣', population: 835792, old: 127016, hospital: 7, beds: 68, employee: 86, x: '51px', y: '-222px'},
        {location: '臺東縣', population: 220802, old: 33060, hospital: 1, beds: 66, employee: 89, x: '-4px', y: '-172px'},
        {location: '花蓮縣', population: 330911, old: 48649, hospital: 3, beds: 132, employee: 130, x: '-55px', y: '-25px'},
        {location: '澎湖縣', population: 103263, old: 15579, hospital: 0, beds: 53, employee: 64},
        {location: '基隆市', population: 372100, old: 51949, hospital: 3, beds: 78, employee: 91, x: '-96px', y: '185px'},
        {location: '新竹市', population: 437337, old: 48141, hospital: 2, beds: 64, employee: 115, x: '7px', y: '128px'},
        {location: '嘉義市', population: 269874, old: 36268, hospital: 5, beds: 146, employee: 198, x: '84px', y: '-59px'},
      ],
      bg: bg,
      section1: section1,
      section2: section2,
      section3: section3,
      mapTranslate: {
        x: '0',
        y: '0'
      },
      mapShow: false,
      mapScale: false,
      mapmenu: false,
      tooltipShow: false,
      selectedText: '選擇縣市',
      selectedCountry: {location: '總計', population: 23539816, old: 3106105, hospital: 115, beds: 69, employee: 103}
    }
  },
  mounted: function(){

    window.addEventListener('scroll', this.handleScroll)

    var w = $(window).width()
    var h = $(window).height()
    var xPadding = 0
    var yPadding = 0

    var svg_w = 375
    var svg_h = 667

    if(w > 400){
      xPadding = -10
      yPadding = 10
    }

    svg = d3.select('#map').append('svg').attr({'width' : svg_w, 'height': svg_h});

    svg.append('image').attr({'xlink:href': './static/taiwan.png', 'x': 0 + xPadding, 'y': 0 + yPadding, 'width': svg_w, 'height': svg_h})
    svg.append('g')
      .style('transform', 'scale(0.18)translate(1273px, 1644px)')
      .append('path')
      .attr('id', 'test')
      .attr('class', 'road')
      .attr('d', "M26.5,623.1v-11.3v-13l-11-4c0,0-3.3-5.3,1.8-8.8s13-8,13-8l7.8-10.8c0,0,2.3-12.5,3-15.3s0-10.5,0-10.5l2.3-7.8v-5.8c0,0,6.5-7.3,6.8-15c0.3-7.7,3.5-25,5-27.7s10.2-15.8,10.2-15.8v-8.3c0,0,21.3-25,22.5-26s1.5-13.8,2.3-17.5s-4-8.3-7-11s-6-6-7-11.5s-4-13.5-4.8-19s-1-12,0.8-16.3s3-9.5,3-14.8s-0.8-11.3,1.3-15.5s5.8-11.5,7.5-17s10.8-16.8,12.5-21.5s9.8-20.8,7.5-26s-8.3-6.8-8.8-10.8c-0.5-4-1-9,1.8-12.8s7.3-6.3,9.3-10.8s7-8.5,8.8-9.3s6.5-8.3,6.8-10s5.5-2.3,5-9.8s1.3-11.8,2.3-15.8s4.8-11,4.8-14.8s-3.3-12,2-16.8s8.9-1.3,12.1-2.8c3.2-1.5,14.4-5,15.2-7.5s32.3-51,32.3-51s4.3-5,14.8-12S229,61.9,229,61.9s0.3-7.3,1.5-13.3S253,12.9,253,12.9")

    svg.append('g')
      .style('transform', 'scale(0.1)translate(1993px, 4244px)')
      .append('path')
      .attr('id', 'test2')
      .attr('class', 'road')
      .attr('d', "M91.1,561.6l-28.5-11.8c-0.3-0.1-0.5-0.4-0.5-0.8l1.1-13.3c0-0.4-0.2-0.7-0.6-0.8l-28.5-6.1c-0.7-0.2-0.8-1.1-0.1-1.4l8.5-3.6c0.5-0.2,0.6-0.8,0.3-1.2l-21.8-22.7c-0.1-0.1-0.2-0.3-0.2-0.5v-7c0-0.1,0-0.3,0.1-0.4l4.2-6.5c0.1-0.2,0.2-0.4,0.1-0.6l-4.4-13.5c0-0.1-0.1-0.2-0.1-0.2l-4.2-5.6c-0.1-0.2-0.2-0.5-0.1-0.7l7.6-23.2c0-0.1,0-0.2,0-0.3l-1-25.3c0,0,0,0,0-0.1l-2-16.3c0-0.1,0-0.2,0-0.3l3.1-10.6c0-0.1,0.1-0.3,0.2-0.4l6.3-5.6c0.2-0.1,0.2-0.3,0.3-0.5c0-2,0.3-12.2,1.2-14.9c1-3,10-9.5,8.8-11.8c-1.1-2-8.6-2.6-10-2.7c-0.2,0-0.3-0.1-0.4-0.2l-6.7-5.3c-0.2-0.2-0.3-0.4-0.3-0.7c0.3-2.5,2.3-15.4,5.4-15.6c3.1-0.2,18.4,0,21.5,0c0.3,0,0.6-0.2,0.7-0.5l3.5-10.2c0-0.1,0-0.2,0-0.2v-14.8c0-0.2,0.1-0.4,0.2-0.5c1.5-1.7,11.1-12.8,8.8-13.5c-1.9-0.6-4.1-1.9-5-2.5c-0.3-0.2-0.4-0.5-0.3-0.8l4.1-17.3c0-0.1,0.1-0.2,0.2-0.3l8-9.5c0.1-0.1,0.1-0.1,0.1-0.2l4.4-12.2c0-0.1,0-0.2,0-0.3l-0.5-8.2c0-0.1,0-0.2,0-0.3l68.7-191.1c0-0.1,0-0.1,0-0.2l1.2-19.1c0-0.2,0.1-0.5,0.3-0.6L173,10.7c0.5-0.3,1.2,0,1.2,0.6v5.3c0,0.4,0.3,0.8,0.8,0.8h11")

    svg.append('g')
      .style('transform', 'scale(0.185)translate(623px, 2810px)')
      .append('path')
      .attr('id', 'test3')
      .attr('class', 'road')
      .attr('d', "M270.5,424.4c0,0,1.1,0.2-9.5-2.5c-10.6-2.7-12.6-4.7-19.3-14c-6.7-9.3-8.5-22-11.9-27.3c-3.4-5.3,0.8-10,0-17.3c-0.8-7.3-9.4-18.5-14.8-25.3c-5.4-6.9-6.9-10.2-4.7-23.3c2.3-13.2-2.7-29-5.9-35.5c-3.2-6.5-4.5-9.4-7-23.2s-7.3-35.1-7.3-35.1s-14.1-24.7-19.8-32.1c-5.7-7.4-7.5-20.5-9.6-33.8S146,124.7,139,118.6c-7-6.1-8-20.7-8.7-26c-0.7-5.3-9.3-19.3-9.3-19.3l-8-10.7l-21.3-9.3L67,39.9L50.3,23.2L17,12.2")

    prj = d3.geo.mercator().center([120.971864, 23.400998])
        .scale(7800).translate([svg_w/2, svg_h/2 + 50]);

    path = d3.geo.path().projection(prj);

    d3.json('./static/towns-63.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-64.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-65.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-66.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-67.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-68.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10002.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10004.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10005.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10007.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10008.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10009.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10010.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10013.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10014.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10015.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10016.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10017.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10018.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json('./static/towns-10020.json', function(data){

      var topo = topojson.feature(data, data.objects.map)

      var g = svg.append('g')

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', function(d){
          if(resouce_leak.indexOf(d.properties.name) != -1){
            return 'town leak'
          }
          else{
            return 'town'
          }
        })
        .attr('id', function(d){
          return d.properties.name
        })
    })

    d3.json("./static/counties.json", function(data){
      
      var topo = topojson.feature(data, data.objects.map);

      var g = svg.append('g').attr('id', 'map-g');

      g.selectAll('path')
        .data(topo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', function(d){
          return '#FFFFFF';
        })
        .attr('fill-opacity', '0')
        .attr('stroke', '#B5B5B6')
        .attr('stroke-opacity', '1')
        .attr('stroke-width', '0.5')
    })

    d3.csv('./static/hospital.csv', function(data){

      circle = svg.selectAll('circle')
        .data(data).enter()
        .append('circle')
        .attr({
          'cx': function(d){
            return prj([d.lat, d.lon])[0]
          },
          'cy': function(d){
            return prj([d.lat, d.lon])[1]
          },
          'id': function(d){
            return d.name
          },
          'class': 'point',
          'r': 0
        })

    })

    svg.append('circle')
        .attr({
          'cx': function(d){
            return prj([121.31118, 23.2209221])[0]
          },
          'cy': function(d){
            return prj([121.31118, 23.2209221])[1]
          },
          'id': '六十石山',
          'class': 'point-s map1',
          'r': 2
        })

    svg.append('text')
        .attr({
          'x': function(d){
            return prj([121.6263725, 23.9878102])[0]
          },
          'y': function(d){
            return prj([121.6263725, 23.9878102])[1]
          },
          'class': 'svg-text map1',
        })
        .text('門諾醫院')

    svg.append('text')
        .attr({
          'x': function(d){
            return prj([121.31118, 23.2209221])[0]
          },
          'y': function(d){
            return prj([121.31118, 23.2209221])[1]
          },
          'class': 'svg-text map1',
        })
        .text('花蓮六十石山')

    svg.append('circle')
        .attr({
          'cx': function(d){
            return prj([121.2044414, 23.0973841])[0]
          },
          'cy': function(d){
            return prj([121.2044414, 23.0973841])[1]
          },
          'id': '金城武樹',
          'class': 'point-s map2',
          'r': 2
        })

    svg.append('text')
        .attr({
          'x': function(d){
            return prj([121.2044414, 23.0973841])[0]
          },
          'y': function(d){
            return prj([121.2044414, 23.0973841])[1]
          },
          'class': 'svg-text map2',
        })
        .text('金城武樹')
    
    svg.append('text')
        .attr({
          'x': function(d){
            return prj([121.1408337, 22.7511439])[0]
          },
          'y': function(d){
            return prj([121.1408337, 22.7511439])[1]
          },
          'class': 'svg-text map2',
        })
        .text('馬偕醫院')

    svg.append('circle')
        .attr({
          'cx': function(d){
            return prj([120.7979742, 21.9452566])[0]
          },
          'cy': function(d){
            return prj([120.7979742, 21.9452566])[1]
          },
          'id': '墾丁大街',
          'class': 'point-s map3',
          'r': 2
        })

    svg.append('text')
        .attr({
          'x': function(d){
            return prj([120.7979742, 21.9452566])[0]
          },
          'y': function(d){
            return prj([120.7979742, 21.9452566])[1]
          },
          'class': 'svg-text map3',
        })
        .text('墾丁大街')
    
    svg.append('text')
        .attr({
          'x': function(d){
            return prj([120.453052, 22.465312])[0]
          },
          'y': function(d){
            return prj([120.453052, 22.465312])[1]
          },
          'class': 'svg-text map3',
        })
        .text('輔英科大附設醫院')

    svg.append('circle')
        .attr({
          'cx': function(d){
            return prj([120.7979742, 21.9452566])[0]
          },
          'cy': function(d){
            return prj([120.7979742, 21.9452566])[1]
          },
          'id': '帝寶',
          'class': 'point-s map4',
          'r': 2
        })

    svg.append('text')
        .attr({
          'x': function(d){
            return prj([120.7979742, 21.9452566])[0]
          },
          'y': function(d){
            return prj([120.7979742, 21.9452566])[1]
          },
          'class': 'svg-text map4',
        })
        .text('帝寶')
    
    svg.append('text')
        .attr({
          'x': function(d){
            return prj([121.518969, 25.0406784])[0]
          },
          'y': function(d){
            return prj([121.518969, 25.0406784])[1]
          },
          'class': 'svg-text map4',
        })
        .text('台大醫院')


  },
  methods: {
    menuClick: function(d){
      console.log(this.main[d])
      this.mapmenu = false
      this.selectedText = this.main[d].location
      this.selectedCountry = this.main[d]
      this.tooltipShow = true
      this.mapScale = true
      this.mapTranslate.x = this.main[d].x
      this.mapTranslate.y = this.main[d].y
      $('.point').css('stroke', 'none')
      $('#' + this.main[d].location).attr('stroke', '#000000')
    },
    handleScroll: function(e){
      let currentH = window.pageYOffset
      var map = currentH - $('#map-contain').offset().top + window.innerHeight
      console.log(map)
      if(map < window.innerHeight - 200){
        this.mapShow = false
        circle.transition().attr({'r': 0})
      }
      else if(map >= window.innerHeight - 200 && map < window.innerHeight * 2){
        this.mapShow = true
        $('.town').css('stroke-opacity', '0')
        $('.leak').css('fill-opacity', '0')
        circle.transition().attr({'r': 2})
      }
      else if(map >= window.innerHeight * 2 && map < window.innerHeight * 3){
        this.mapShow = false
        this.mapScale = false
        this.tooltipShow = false
        this.mapTranslate.x = 0
        this.mapTranslate.y = 0
        $('.town').css('stroke-opacity', '1')
        $('.leak').css('fill', '#EF4326')
        $('.leak').css('fill-opacity', '1')
        $('.point-s').css('opacity', '0')
        $('#map').css('transform', 'translate(0, 0)')
        circle.transition().attr({'r': 0})
        $('.road').css('stroke-dashoffset', '')
        $('.svg-text').css('opacity', 0)
      }
      else if(map >= window.innerHeight * 3 && map < window.innerHeight * 4){
        this.mapTranslate.x = '-61px'
        this.mapTranslate.y = '-10px'
        this.mapScale = true
        $('.leak').css('fill-opacity', '0')
        $('.town').css('stroke-opacity', '0')
        $('.point-s').css('opacity', '0')
        $('.road').css('opacity', 1)
        $('.point').attr('r', 0)
        $('#臺灣基督教門諾會醫療財團法人門諾醫院').attr('r', 2)
        $('.road').css('stroke-dashoffset', '')
        $('#test').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map1').css('opacity', 1)
      }
      else if(map >= window.innerHeight * 4 && map < window.innerHeight * 5){
        this.mapTranslate.x = '-20px'
        this.mapTranslate.y = '-134px'
        this.mapScale = true
        $('.point-s').css('opacity', '0')
        $('.point').attr('r', 0)
        $('#馬偕紀念醫院台東分院').attr('r', 2)
        $('.road').css('stroke-dashoffset', '')
        $('#test2').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map2').css('opacity', 1)
      }
      else if(map >= window.innerHeight * 5 && map < window.innerHeight * 6){
        this.mapTranslate.x = '56px'
        this.mapTranslate.y = '-203px'
        this.mapScale = true
        $('.point-s').css('opacity', '0')
        $('.point').attr('r', 0)
        $('#輔英科技大學附設醫院').attr('r', 2)
        $('.road').css('stroke-dashoffset', '')
        $('#test3').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map3').css('opacity', 1)
      }
      else if(map >= window.innerHeight * 6 && map < window.innerHeight * 7){
        this.mapTranslate.x = '-78px'
        this.mapTranslate.y = '153px'
        this.mapScale = true
        $('.point-s').css('opacity', '0')
        $('.point').attr('r', 0)
        $('#國立台灣大學醫學院附設醫院').attr('r', 2)
        $('.road').css('stroke-dashoffset', '')
        $('#test4').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map4').css('opacity', 1)
      }
      else{

      }
    },
    expand: function(){
      this.mapmenu = !this.mapmenu
    }
  },
  components: {
    Indicator, Cover, ContentContainer, Section, Share, Editor, Relate, FBComment, Foot, Logo
  }
}
</script>

<style>

html, body, #app{
  height: 100%;
}

svg{
  width: 100%;
}

.svg-text{
  font-size: 6px;
  text-anchor: end;
  transform: translate(-6px, 2px);
  transition: all 0.7s ease;
  opacity: 0;
}

#test{
  stroke-dasharray: 723.83642578125;
  stroke-dashoffset: 723.83642578125;
}

#test2{
  stroke-dasharray: 713.1190795898438;
  stroke-dashoffset: 713.1190795898438;
}

#test3{
  stroke-dasharray: 522.3107299804688;
  stroke-dashoffset: 522.3107299804688;
}

.road{
  fill:none;
  stroke:#E84B37;
  stroke-width: 5;
  transition: all 1.2s ease;
  opacity: 0;
}

.space{
  height: 100%;
}

.point{
  stroke-width: 0.5;
  fill: #EF4326;
  fill-opacity: 0.8;
}

.point-s{
  stroke-width: 0.5;
  fill: #EF4326;
  opacity: 0;
}

.town{
  fill: #FFFFFF;
  fill-opacity: 0;
  stroke: #B5B5B6;
  stroke-opacity: 0;
  stroke-width: 0.5;
  transition: all 1.2s ease;
}

.textbox{
  padding: 30px 20px;
  color: #4D4D4D;
  font-size: 18px;
  box-shadow: -2.8px 1.1px 7px 0 rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
}

#cover #cover-contain{
  position: absolute;
  left: 20px;
  top: 38%;
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

#cover-icon{
  width: 140px;
  position: absolute;
  right: 20px;
  top: 10%;
}

#map-contain{
  overflow: hidden;
  position: relative;
  height: 100%;
}

#svg-contain{
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  transition: all 0.7s ease;
}

#map{
  transition: all 1.2s ease;
}

.zoomIn{
  transform: scale(2.5);
}

#map-menu{
  position: fixed;
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
  position: fixed;
  width: 110px;
  height: 28px;
  left: 20px;
  top: 90px;
  border-bottom: 1px solid #AAAAAA;
  font-size: 15px;
  color: #828282;
  transition: all 0.7s ease;
  background-color: #FFFFFF;
  z-index: 9;
  opacity: 0;
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
  position: fixed;
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
  z-index: 9;
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

#map-select.show{
  opacity: 1;
}

</style>
