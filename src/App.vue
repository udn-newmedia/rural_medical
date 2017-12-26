<template>
  <div id="app">
    <Indicator color="#EF4326" />
    <HeadBar />
    <Cover :src="bg">
      <div id="cover-contain">
        <h1>偏鄉醫療數據</h1>
      </div>
      <div id="cover-icon">
        <img src="./assets/pill.png">
      </div>
    </Cover>
    <div :style="{backgroundImage:bg}" >TTEEST</div>
    <ContentContainer>
      <div id="cover-text">
        今年6月，新北市根據衛福部<a href="https://dep.mohw.gov.tw/DOS/np-3050-113.html" target="_blank">2015年醫療服務量統計資料</a>，分析數據發現，新北市每萬人病床數只有43床，本島最低，只比金門、馬祖高，自稱是「全台醫療資源最欠缺的地方」，引發議論。
        <br/>
        <br/>
        <b>衛福部該份資料顯示，全國22縣市中，嘉義市醫療資源最充足，其次是花蓮縣和台北市，花蓮縣竟贏過台中、高雄等都會區，推翻一般民眾認為東部醫療資源缺乏的印象。</b>病床數、醫療人員數多真能代表區域醫療資源充足嗎？這樣的數據分析有哪些迷思？
      </div>
      <br/>
      <Share />
      <br/>
    </ContentContainer>
    <Section :src="section1" text="政府說醫療資源充足，你相信嗎？"/>
    <div id="map-contain">
      <div id="map-say" :class="{show: mapShow}">
        <span class="circle"></span>{{mapsay}}<br/>{{mapsource}}
      </div>
      <ContentContainer id="map-content" :class="{show: mapShow}">
        <h2>{{mapcontent}}</h2>
      </ContentContainer>
      <div id="map-menu" :class="{open: mapmenu}">
        <div class="item" @click="menuClick(index)" v-for="(item, index) in main" :key="item.id">{{item.location}}</div>
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
      <div id="map-board" :class="{show: boardShow}">
        <div id="board-title">{{selectedCountry.location}}</div>
        <div class="board-text">老年人口<span>{{selectedCountry.old}}</span></div>
        <div class="board-text">癌症死亡人口<span>{{selectedCountry.cancer}}</span></div>
        <div class="board-text">多少零安寧資源鄉鎮<span>{{selectedCountry.noresource}}</span></div>
        <div class="board-text" id="board-text-s">沙漠比率<span id="dessertNumber">{{selectedCountry.dessert}}%</span></div>
      </div>
      <div id="map-select" :class="{open: mapmenu, show: mapSelect}" @click="expand">
        <img src="./assets/search.png">
        <span>{{selectedText}}</span>
      </div>
      <div id="svg-contain" :class="{zoomIn: mapScale, zoomInBig: mapScaleBig}">
        <div id="map" :style="{transform: 'translate(' + mapTranslate.x + ', ' + mapTranslate.y + ')'}"></div>
      </div>
    </div>
    <div class="textbox" id="r-1">
      探討醫療資源分布的區域差異時，不能只看病床數、醫事人員數，這樣的計算方式是假設區域內的人口和醫療機構是平均分布，但事實上醫療機構根本分布不均。《聯合報》團隊透過大數據清洗，並且結合地圖畫出全國醫學中心及區域醫院位置，圖中可清楚發現，<b>大型醫療院所多集中在北部和西部，東部較少</b>，顯示全國醫療資源分布落差。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-2">
      進一步觀察，每一個縣市也有醫療資源分配不均情況。比如被衛福部稱為醫療資源豐沛的花蓮縣，主因人口較少，平均下來每萬人病床數可高達132床、醫事人員數130人，在全國名列前茅。但透過地圖就能清楚看到官方數據陷阱，花蓮縣地廣、醫院數少，且<b>三家大型醫院都集中花蓮市，花蓮中南區偏鄉民眾就醫極度不便</b>。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-3">
      以花蓮熱門景點六十石山為例，其位在花蓮縣最南邊的富里鄉，因為偏鄉醫療資源不足，當地民眾若要看病，只能跑大醫院。我們利用Google map路線規劃功能試算，當地到縣內三家大型醫院的行車時間，最短車程得花上2小時17分，才能抵達花蓮市區的門諾醫院。<br/><br/>偏鄉多老人家，普遍沒有交通工具，搭計程車到大醫院來回車資至少上千元；若搭公車，等車、換車得花上一整天。對偏鄉老人來說，就醫可謂是一條漫漫長路。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-4">
      後山醫療不均問題，花東縣市居民點滴在心頭。台東金城武樹是許多遊客造訪的熱門景點，位於好山好水的池上鄉，但這裡的長輩生活可能不像風景如此美好，翻山越嶺看病是他們的日常。<br/><br/>台東縣只有一家區域醫院馬偕台東分院，位於台東市，池上鄉居民若要就醫，最短車程得花上1小時11分。台東縣衛生局指出，台東每萬人平均病床術雖只略低於全國平均值，但若縮小範圍以次醫療區計算，台東區只有42床，關山、成功區都不到10床，大武區更慘，掛鴨蛋。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-5">
      根據衛福部數據，屏東縣的醫療資源與全國平均相近。但把數據放到地圖上便一目瞭然，屏東縣醫療資源多集中在屏東市，南北狹長的地理位置，南端的恆春半島包含恆春鎮、車城、滿州、牡丹鄉，居民就醫極度不便。<br/><br/>以恆春鎮的墾丁大街為例，這裡的居民要到大醫院看病，最短得花上1小時26分鐘車程。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-6">
      反觀台北市，醫療資源豐沛，市區內有20家大型醫院，就醫可近性高。若以一位住在大安區「帝寶」的居民為例，最短只需要5分鐘，便可抵達鄰近的台大醫院，與偏鄉居民就醫時間形成極大落差。
    </div>
    <div class="space"></div>
    <div class="space" id="r-7"></div>
    <div class="textbox" id="r-8">
      食藥署2017年9月曾公布，「全國健保特約藥局數量已達到6000家以上，藥局密度甚至高於我們日常生活常光顧的便利商店。」但食藥署沒說的是，即使藥局密度如此高，<b>全國仍有52個鄉鎮市區連一家健保藥局都沒有，估計36.8萬人受影響</b>。
      <br/><br/>
      慢性病患者可持「慢性病連續處方箋」到附近的健保特約藥局領藥，就可免跑醫院排隊掛號、批價，但沒有健保藥局的地區多位於人口密度低的偏鄉及山區，這裡的居民必須跨區領藥，<b>他們雖然繳納相同的健保費，卻無法享受同等的醫療資源</b>。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-9">
      <b>進一步分析這52個沒有健保藥局的鄉鎮市區，其中有15個是「超高齡鄉鎮」</b>。而老年人口中，高達八成至少罹患一種慢性疾病，他們必須定期領藥，是最需要健保藥局的族群。
      <br/><br/>
      慢性病患者可持「慢性病連續處方箋」到附近的健保特約藥局領藥，就可免跑醫院排隊掛號、批價，但沒有健保藥局的地區多位於人口密度低的偏鄉及山區，這裡的居民必須跨區領藥，<b>他們雖然繳納相同的健保費，卻無法享受同等的醫療資源</b>。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-10">
      2018年11月底，苗栗縣一名男子急病，輾轉苗栗、新竹、台北醫院急救，5天後回天乏術，此事件凸顯苗栗緊急醫療資源不足問題。根據衛福部公布「緊急醫療資源不足」地區，轉換成鄉鎮市區於地圖上表示，<b>全國有141個鄉鎮市區缺乏緊急醫療資源，居民一旦發生突發中風、心肌梗塞、重大外傷等急重症，只能轉送其他地區，可能因此錯失黃金搶救時間</b>，有些人甚至途中就不幸死亡，轉診幾乎變成在賭命。
    </div>
    <Section :src="section2" text="臨終最後一哩路 你的家鄉安寧嗎？" id="r-11"/>
    <div class="space"></div>
    <div class="textbox" id="r-12">
      寧靜的走完人生旅程，是許多病患的願望，但「好死」仰賴專業及資源。國內安寧療護現分為住院、共照、居家與社區三塊，《聯合報》盤點各縣市資料，發現縣市間資源落差極大：最豐沛的「安寧綠洲」只有台北市與嘉義市，各鄉鎮都有安寧療護資源可用；反觀「沙漠區」前五名：基隆市、新竹縣、台東縣、高雄市及苗栗縣，6成6以上的鄉鎮區「零資源」，病人想安心走完臨終前最後一哩路，必須遠赴外縣市找安寧病床才能圖個好死，在地善終成為奢望。
    </div>
    <div class="space"></div>
    <div class="textbox" id="r-13">
      以沙漠比率（零資源的鄉鎮區數／總鄉鎮區數）最高的基隆市為例，7個鄉鎮區內僅信義區、安樂區兩區有安寧病床、居家安寧團隊等資源，剩餘的5個鄉鎮區內什麼都沒有，沙漠比率高達7成1。
    </div>
    <div class="space"></div>
    <div class="space" id="r-14"></div>
    <div class="space" id="r-15"></div>
    <ContentContainer background-color="#FFFFFF" id="r-16">
      <p>安寧療護資源分布的最綿密的「綠洲」縣市台北市及嘉義市，縣市內所有鄉鎮區都有至少一種安寧療護資源可利用，沙漠比率0％，民眾就近就可以找到安寧病床，或居家安寧團隊，來陪伴家人走過人生最後一哩路。</p>
      <p><br/></p>
      <p>日前，一根鼻胃管引發作家瓊瑤與平家之間的激烈衝突，怎麼做才是對失智的皇冠出版社創辦人平鑫濤而言才是最好的，社會有不同的聲浪；前體育主播傅達仁遠赴瑞士，成為安樂死機構合格會員，再次掀起各界對「善終」的關注與討論。</p>
      <p><br/></p>
      <p>台灣安樂死尚未合法化，仍有爭議和疑慮待討論；安寧療護的推動，則已是各界共識，減少末期病人在病榻上的折磨，是安寧療護的功能與目標。儘管參與的醫療院所家數、病人利用率看似逐年增加，從數據及訪談中，發現安寧療護發展目前仍遇到<b>三大問題：</b></p>
      <p><br/></p>
      <h2>一、各縣市落差大，住哪裡決定能否「好好死」？</h2>
      <p><br/></p>
      <p>台灣醫療改革基金會2015年首度公布「在地好命善終排行榜」，凸顯出縣市間的安寧療護資源差距。兩年多過去，安寧療護資源在各縣市間還是有不小落差。醫改會研究員辜智芬直言，預算不足是共同原因，但除了預算問題，縣市首長的態度更重要。</p>
      <p><br/></p>
      <Quote text="主要看老闆（指縣市首長）重不重視，重視就有經費、推動就有力" />
      <p><br/></p>
      <p>醫改會曾詢問過各地衛生局長，多數都提到預算不足問題。辜智芬說，衛生佔整體市政經費平均僅有1.4％到1.5％，這些經費要發展癌篩、衛教、急重難症等多元項目，能撥給安寧療護的微乎其微。</p>
      <p><br/></p>
      <p>微薄的經費更考驗縣市首長的態度。辜智芬說，安寧療護朝居家、社區方向發展已是世界潮流，「縣市首長的眼光有沒有跟上？」居家、社區安寧除了錢，更仰賴人力投入、政策支持，若縣市首長不重視，縣市本身資源再多也沒用；反觀一些小縣市，願意關注這塊，資源不多也能做出成績。</p>
      <p><br/></p>
      <p>健保署表示，安寧療護資源目標希望以次醫療區（數個鄰近鄉鎮為一次醫療區）都有，目前還沒達到，會持續推動。</p>
      <p><br/></p>
      <h2>二、居家、社區遍地開花？恐是「海市蜃樓」</h2>
      <p><br/></p>
      <p>目前全台有一百多間診所、衛生所投入社區安寧，但第一線醫師和健保署都坦言，取得資格是一回事，真正有在做的診所還是很有限，一方面是病人仍對醫院的依賴仍深，另一方面是缺乏誘因與武器、後援，讓想做的醫生卻步。</p>
      <p><br/></p>
      <p>在南投縣推動社區醫療照護整合團隊多年的南投醫院放射腫瘤科主任翁益強，從診所不敢做、不知怎麼做，到順利讓數個診所投入、與南投醫院緊密合作，過程中發現不少問題。</p>
      <p><br/></p>
      <p>翁益強指出，開業的診所醫生不像醫院有社工師，團隊相對弱，13小時的教育訓練也讓很多人擔心只學到皮毛，且健保給付打七折、花費的時間多，真正敢做、願意做的診所不多。</p>
      <p><br/></p>
      <p>就算有心要做，基本的「武器」取得都有困難。舉例來說，想做替末期病人止痛所需的嗎啡因是管制藥，一般診所難以保管，馬上就「卡關」。翁益強說，與醫院合作，能解決藥物的問題，團隊也可以透過開會共同討論病情、彼此間隨時互相支援，減少診所壓力；行政方面，他找了一位熟悉安寧療護的個案管理師，協助診所管理。</p>
      <p><br/></p>
      <p>翁益強建議，現在雖規定診所做社區安寧療護，需要找一間「後援醫院」，但制度並沒有給後援醫院任何誘因，兩者之間只是一紙合約，沒有太實質的合作，應設法提供誘因增加醫院投入醫院，醫院、診所連結緊密，才能真正落實末期病人對「就近」的需求。</p>
      <p><br/></p>
      <h2>三、我不是癌症，但也想好好走完人生最後一哩路</h2>
      <p><br/></p>
      <div id="draw-1"></div>
      <p><br/></p>
      <p>從數據中發現，不論是癌症或非癌病人，在過世前一個月使用安寧療護的比率都是逐年提升，但非癌病人利用率明顯偏低、成長緩慢。</p>
      <p><br/></p>
      <p>翁益強指出，癌症有癌症防治法、有專責的資源和單位在管，推廣安寧觀念效果會很快速；反觀非癌病人，死亡人口中雖有3／4病人是「非癌」，但不像癌症有專責的推廣單位，觀念提升的速度自然較慢。</p>
      <p><br/></p>
      <p>此外，非癌病人相較癌症病人，疾病病程變數較大，仰賴臨床判斷，觀念上也不太會連結到安寧。不過翁益強認為，所謂的「變數大」，其實反映了醫生也需要教育，早期癌症治療也很多人反彈安寧，但現在觀念已慢慢推廣，當醫生都有安寧療護的觀念，就更能判斷何時需要安寧療護介入、真正幫助病人。</p>
    </ContentContainer>
    <Section :src="section3" text="醫生病人相對論為什麼我們等不到彼此？"/>
    <ContentContainer background-color="#FFFFFF">
      <h2>一、要看病，到底難在哪？</h2>
      <p><br/></p>
      <p>依仰阿嬤（88），與年邁的先生同住在花蓮縣秀林鄉文蘭村重光部落，距離市區門諾等大醫院約40分鐘車程。三女兒謝美麗（Nanu）今年6月結束市區的美髮店生意，返家與父母同住。</p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/xie.jpg" alt="">
        </div>
        <div class="people-name">
          病人家屬謝美麗
        </div>
      </div>
      <p><br/></p>
      <p>我媽有高血壓、心臟病、氣喘、呼吸中止等病史，9年前曾因心臟衰竭和肺積水住院治療。慢性病需要規率服藥，加上看眼科、骨科，一個禮拜至少要來回醫院兩次。</p>
      <p><br/></p>
      <p>要拿這些藥、看這些病，一定要去大醫院，家附近也沒有什麼小醫院或診所，主要都是去門諾醫院和慈濟醫院兩家。花蓮山區多數都沒有公車可搭，還沒有申請復康巴士的時候，只能叫計程車，單趟1000到1200元跑不掉。</p>
      <p><br/></p>
      <p><b>有錢也不一定叫得到車，我們住得遠，司機不一定願意來，或者要求加價；媽媽坐輪椅，需要無障礙計程車，車子更少。</b></p>
      <p><br/></p>
      <p>以前還沒回家住時，因為去醫院很麻煩，媽媽若不舒服，就把家裡不知道擺了多久的成藥、草藥拿出來隨便吃吃，或者挖出醫生很久前開的止痛藥吃，找到車子才能到市區看醫生。</p>
      <p><br/></p>
      <p>媽媽前幾年曾跟我妹妹在台北住了幾年，那時在台北馬偕醫院看醫生，好方便，坐捷運幾站就到，跟這裡差很多。</p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/lin.jpg">
        </div>
        <div class="people-name">
          復康巴士司機林枝憲
        </div>
      </div>
      <p><br/></p>
      <p>偏鄉的老人家，住愈遠通常經濟狀況也愈差，很多更伴隨著獨居、老老照顧、隔代教養等多重困境，處境更加艱難。（註：長期在花東服務的門諾基金會統計，門諾目前居服個案中，有6％為老老、老小照顧）</p>
      <p><br/></p>
      <p>曾接過一個個案，家住在一個大陡坡上方，個案阿公和我說，全家只有他兒子有辦法推他出門、下坡、進城，若兒子不在，他就只能困在家中。</p>
      <p><br/></p>
      <p><b>花蓮面積4600多平方公里，北到南全長173公里，但全花蓮只有32輛復康巴士，卻有6500個個案有需求，供不應求</b>。花蓮大眾運輸不普及，有也都在台九線（主幹道）上，根本伸不進鄉鎮角落。</p>
      <p><br/></p>
      <p>我們不是專業護理人員，依規定不能到個案家中搬動個案，以免出事時責任歸屬難釐清。但有時候，<b>一些阿公阿嬤自己搭車看診，進門後會問「可不可以把我搬上床？」我幫了，就違反規定，但不幫，老人家就得在輪椅上坐到子女下班後才能上床</b>，看著他們的眼睛，怎麼忍心拒絕？</p>
      <p><br/></p>
      <p><br/></p>
      <div class="doctor">
        <div class="doctor-underline"></div>
        <div class="doctor-text">聽聽醫生怎麼說</div>
      </div>
      <p><br/></p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/yu.jpg">
        </div>
        <div class="people-name">
          台灣在宅醫療學會理事長<br/>余尚儒
        </div>
      </div>
      <p><br/></p>
      <p><b>醫療是對應需求，你今天要活下去，多遠都要去</b>，偏鄉民眾為了就醫，往往需要花更高的交通費與時間成本。在山區看醫生，1個小時、1個半小時都是正常的。</p>
      <p><br/></p>
      <p>以我服務的台東縣東河鄉都蘭村為例，位處偏遠山區，植物人病患要緊急送醫，搭救護車到台東市區最近的醫院至少要1小時，單程就要花5000元。一般病患搭計程車，單趟也要500元。</p>
      <p><br/></p>
      <p>還有更多偏鄉居民，每個月得花上千元坐計程車往返醫院，就為了領慢性病藥，因為整個東河鄉有9000人口，連一間健保藥局都沒有。民眾要拿藥，只能舟車勞頓、花費昂貴車資跑到大醫院。</p>
      <p><br/></p>
      <p>城鄉醫療資源分布不均，在都市，就醫從來不是問題，隨處可見診所和藥局林立，但是在醫療資源貧瘠的偏鄉，不僅沒有診所和藥局，看病之路更是漫長。偏鄉地區民眾<b>雖然繳一樣的健保費，但都市與偏鄉享受到的醫療資源卻不一樣</b>。且偏鄉青年人口流失，很多獨居老人、老老照顧，加上多屬經濟弱勢，更加深偏鄉醫療困境。</p>
      <p><br/></p>
      <div class="img-contain">
        <img src="./assets/3-1.jpg">
      </div>
      <p><br/></p>
      <h2>二、好不容易看了病，拿藥也難</h2>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/xie.jpg">
        </div>
        <div class="people-name">
          病人家屬謝美麗
        </div>
      </div>
      <p><br/></p>
      <p>高血壓那些慢性病，可以拿慢性長期處方籤，醫生一次開三個月的藥，在醫院拿第一個月，後面兩個月就拿處方籤去藥局拿藥，不用常跑醫院。聽起來方便，但對我來說根本沒用。</p>
      <p><br/></p>
      <p>我家附近、甚至整個秀林鄉一間藥局，拿到處方籤，要去哪裡找後面兩個月的藥？還是得跑去市區。<p>
      <p><br/></p>
      <p>花蓮慈濟醫院每週四會有巡迴醫療來看診，我曾問過巡迴醫療的醫師，能不能在他（指巡迴醫療）這邊開藥、拿藥，他說沒辦法，他們沒有配備慢性病所需的藥品，不能隨便開，也沒辦法幫我們從醫院帶需要的藥過來。</p>
      <p><br/></p>
      <p><br/></p>
      <div class="doctor">
        <div class="doctor-underline"></div>
        <div class="doctor-text">聽聽醫生怎麼說</div>
      </div>
      <p><br/></p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/yu.jpg">
        </div>
        <div class="people-name">
          台灣在宅醫療學會理事長<br/>余尚儒
        </div>
      </div>
      <p><br/></p>
      <p>偏鄉地區人口外移嚴重，藥師不願意到偏鄉開業，這就跟在鄉下開一家便利商店，容易虧損倒閉是一樣的道理，市場競爭的結果，偏鄉社區型藥局生存不易。可是<b>如果所有醫療資源分配都由市場機制決定，偏鄉居民要怎麼活？</b>目前政府也沒有提供補助或獎勵措施，難以吸引藥師到偏鄉開設藥局。</p>
      <p><br/></p>
      <p>現在偏鄉地區大多靠社區藥局的藥師送藥到府，減少民眾往返醫院領藥的不便。不像傳統藥師多半在藥局等待患者上門，這些「行動藥師」步出藥局，走進老人家和行動不便病人的家中，送上慢性處方籤和提供藥物諮詢服務。不過，藥師外出送藥都沒有額外收入，完全是靠熱心、志願性提供服務。</p>
      <p><br/></p>
      <div class="img-contain">
        <img src="./assets/3-2.jpg">
      </div>
      <p><br/></p>
      <h2>三、偏鄉醫療最需要的是什麼？</h2>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/xie.jpg" alt="">
        </div>
        <div class="people-name">
          病人家屬謝美麗
        </div>
      </div>
      <p><br/></p>
      <p>最需要的當然還是交通要方便，或者是要能有就近看病、拿藥的地方。</p>
      <p><br/></p>
      <p>有復康巴士是很好，但不好預約，而且看醫生的時間很難預料，有些醫生會體諒你、知道你要趕車，讓你先看，但這樣的醫生是少數。有時候醫生叫我們轉診到其他科，一轉就轉半天，趕不上巴士怎麼辦？</p>
      <p><br/></p>
      <div class="people">
        <div class="people-img">
          <img src="./assets/lin.jpg">
        </div>
        <div class="people-name">
          復康巴士司機林枝憲
        </div>
      </div>
      <p><br/></p>
      <p>政府統計說花蓮居民平均擁有的病床數、醫護人員人數多，但花蓮所有醫療資源都集中在花蓮市和吉安鄉，鄉鎮間差異很大，近的去醫院很快，遠的要看個病難如登天，醫療資源要深入到每個聚落、分布均勻。</p>
      <p><br/></p>
      <p><b>偏鄉地區不一定需要蓋大醫院，要解決偏鄉就醫可近性的問題，最重要的是要廣設基層社區診所，讓診所有「一站式」的功能</b>，除了看診外，還可以提供基本檢查服務，像是超音波、胃鏡等，日本鄉下衛生所都有這些設備，偏鄉民眾就不用為了做檢查跑到大醫院。</p>
      <p><br/></p>
      <p>但是目前診所並沒有發揮應有的功能，原因是健保給付制度對基層診所不利，診所購入醫療儀器無法獲得給付，醫師當然不願意進。很多藥物規定一定要做檢查才能開立，像失智症鑑定一定要到醫院，診所不能開失智症藥物，但是鄉下的失智症長輩要怎麼去醫院？怎麼定期回診？理論上，應該讓有認證的偏鄉診所就能開藥，才能讓當地民眾就醫需求就近獲得解決。</p>
      <p><br/></p>
      <p>要讓醫師願意到偏鄉開業，就必須提高給付。偏鄉基層照護，包括檢查、用藥，只要診所能做，就應該按照醫院給付，甚至是提供更好的條件。或是有一些獎勵措施，例如願意到偏鄉開藥局，政府就幫忙付藥局租金，必須提供足夠誘因，這樣才有醫師願意做。</p>
      <p><br/></p>
      <p>偏鄉診所、藥局可以提供更彈性的服務，不需要像都市地區全天候營業，開到晚上10點、11點，因為偏鄉民眾的醫療服務使用量不像都會區那麼高；但相對地，醫師會擔心營業時間不夠長、造成虧損。因此<b>提高給付，讓偏鄉醫師能夠生存，才能真正解決就醫可近性的問題</b>。當偏鄉民眾有需要時找得到醫生、有人可以提供服務，這才是最重要的。</p>
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
import HeadBar from '@/components/HeadBar'
import { Indicator, ContentContainer, Quote, Share, Editor, Relate, FBComment, Foot, Logo } from 'udn-newmedia-vue-components'

import bg from '@/assets/bg.jpg'

import section1 from '@/assets/section1.jpg'
import section2 from '@/assets/section2.jpg'
import section3 from '@/assets/section3.jpg'

import pharmacy1 from '@/assets/pharmacy1.png'
import pharmacy2 from '@/assets/pharmacy2.png'

var svg, circle, prj, path
var pagePadding = 50

var resouce_leak = ["三重區","蘆洲區","八里區","五股區","林口區","泰山區","竹北市","新豐鄉","湖口鄉","新埔鎮","竹東鎮","寶山鄉","北埔鄉","峨眉鄉","芎林鄉","橫山鄉","關西鎮","尖石鄉","五峰鄉","後龍鎮","西湖鄉","通霄鎮","苑裡鎮","竹南鎮","頭份市","三灣鄉","南庄鄉","造橋鄉","芳苑鄉","二林鎮","埤頭鄉","竹塘鄉","大城鄉","田中鎮","二水鄉","田尾鄉","北斗鎮","溪州鄉","埔里鎮","仁愛鄉","魚池鄉","國姓鄉","草屯鎮","南投市","名間鄉","中寮鄉","竹山鎮","鹿谷鄉","集集鎮","水里鄉","信義鄉","口湖鄉","北港鎮","水林鄉","元長鄉","四湖鄉","虎尾鎮","大埤鄉","土庫鎮","西螺鎮","二崙鄉","崙背鄉","褒忠鄉","臺西鄉","東勢鄉","麥寮鄉","斗六市","林內鄉","莿桐鄉","古坑鄉","斗南鎮","民雄鄉","竹崎鄉","番路鄉","中埔鄉","阿里山鄉","大埔鄉","梅山鄉","大林鎮","溪口鄉","新港鄉","朴子市","六腳鄉","東石鄉","布袋鎮","太保市","鹿草鄉","義竹鄉","旗山區","美濃區","六龜區","甲仙區","杉林區","內門區","茂林區","桃源區","那瑪夏區","枋寮鄉","春日鄉","枋山鄉","獅子鄉","恆春鎮","車城鄉","滿洲鄉","牡丹鄉","馬公市","湖西鄉","白沙鄉","西嶼鄉","望安鄉","七美鄉","關山鎮","池上鄉","海端鄉","鹿野鄉","延平鄉","成功鎮","長濱鄉","東河鄉","大武鄉","達仁鄉","金峰鄉","太麻里鄉","萬榮鄉","鳳林鎮","光復鄉","豐濱鄉","玉里鎮","富里鄉","卓溪鄉","瑞穗鄉"]
var pharmacy_leak = ["南化區", "龍崎區", "田寮區", "永安區", "茂林區", "桃源區", "那瑪夏區", "坪林區", "平溪區", "貢寮區", "烏來區", "橫山鄉", "峨眉鄉", "五峰鄉", "大同鄉", "造橋鄉", "三灣鄉", "獅潭鄉", "泰安鄉", "鹿谷鄉", "中寮鄉", "大埔鄉", "滿州鄉", "三地門鄉", "霧臺鄉", "泰武鄉", "來義鄉", "獅子鄉", "牡丹鄉", "豐濱鄉", "富里鄉", "秀林鄉", "萬榮鄉", "卓溪鄉", "大武鄉", "東河鄉", "綠島鄉", "延平鄉", "海瑞鄉", "達仁鄉", "金峰鄉", "蘭嶼鄉", "白沙鄉", "望安鄉", "七美鄉", "金寧鄉", "烈嶼鄉", "烏坵鄉", "南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"]
var dessert_leak = ["基隆市", "新竹縣", "臺東縣", "高雄市", "苗栗縣"]
var dessert_rich = ["臺北市", "嘉義市"]

export default {
  name: 'app',
  data: function(){
    return {
      main: [
        {id: 0, location: '新北市', population: 3979208, old: 465909, hospital: 10, beds: 69, employee: 68, x: '-83px', y: '164px'},
        {id: 1, location: '臺北市', population: 2695704, old: 419130, hospital: 20, beds: 93, employee: 168, x: '-83px', y: '174px', cancer: 5219, noresource: 0, dessert: 0},
        {id: 2, location: '桃園市', population: 2147763, old: 219425, hospital: 20, beds: 70, employee: 96, x: '-39px', y: '147px'},
        {id: 3, location: '臺中市', population: 2767239, old: 301904, hospital: 16, beds: 76, employee: 115, x: '20px', y: '53px'},
        {id: 4, location: '臺南市', population: 1886033, old: 259701, hospital: 10, beds: 68, employee: 108, x: '90px', y: '-109px'},
        {id: 5, location: '高雄市', population: 2779371, old: 373604, hospital: 10, beds: 78, employee: 120, x: '68px', y: '-161px'},
        {id: 6, location: '宜蘭縣', population: 457538, old: 67808, hospital: 3, beds: 85, employee: 98, x: '-90px', y: '115px'},
        {id: 7, location: '新竹縣', population: 547481, old: 64040, hospital: 1, beds: 44, employee: 51, x: '-20px', y: '122px'},
        {id: 8, location: '苗栗縣', population: 559189, old: 82771, hospital: 3, beds: 59, employee: 64, x: '8px', y: '94px'},
        {id: 9, location: '彰化縣', population: 1287146, old: 182962, hospital: 5, beds: 59, employee: 90, x: '74px', y: '5px'},
        {id: 10, location: '南投縣', population: 505163, old: 80135, hospital: 1, beds: 65, employee: 73, x: '8px', y: '-14px'},
        {id: 11, location: '雲林縣', population: 694873, old: 118764, hospital: 5, beds: 56, employee: 73, x: '81px', y: '-23px'},
        {id: 12, location: '嘉義縣', population: 515320, old: 92234, hospital: 1, beds: 66, employee: 83, x: '70px', y: '-54px'},
        {id: 13, location: '屏東縣', population: 835792, old: 127016, hospital: 7, beds: 68, employee: 86, x: '51px', y: '-222px'},
        {id: 14, location: '臺東縣', population: 220802, old: 33060, hospital: 1, beds: 66, employee: 89, x: '-4px', y: '-172px'},
        {id: 15, location: '花蓮縣', population: 330911, old: 48649, hospital: 3, beds: 132, employee: 130, x: '-55px', y: '-25px'},
        {id: 16, location: '澎湖縣', population: 103263, old: 15579, hospital: 0, beds: 53, employee: 64},
        {id: 17, location: '基隆市', population: 372100, old: 51949, hospital: 3, beds: 78, employee: 91, x: '-96px', y: '185px', cancer: 750, noresource: 5, dessert: 71.4},
        {id: 18, location: '新竹市', population: 437337, old: 48141, hospital: 2, beds: 64, employee: 115, x: '7px', y: '128px'},
        {id: 19, location: '嘉義市', population: 269874, old: 36268, hospital: 5, beds: 146, employee: 198, x: '84px', y: '-59px', cancer: 601, noresource: 0, dessert: 0},
      ],
      bg: bg,
      section1: section1,
      section2: section2,
      section3: section3,
      pharmacy1: pharmacy1,
      pharmacy2: pharmacy2,
      mapTranslate: {
        x: '0',
        y: '0'
      },
      mapShow: false,
      mapScale: false,
      mapScaleBig: false,
      mapmenu: false,
      mapSelect: false,
      tooltipShow: false,
      boardShow: false,
      selectedText: '選擇縣市',
      selectedCountry: {location: '總計', population: 23539816, old: 3106105, hospital: 115, beds: 69, employee: 103, cancer: 0, noresource: 0, dessert: 71.4},
      mapcontent: '政府說醫療資源充足，你相信嗎？',
      mapsay: '資料來源：衛生福利部',
      mapsource: '資料統計時間：2016年底'
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
          var temp = 'town'
          if(resouce_leak.indexOf(d.properties.name) != -1){
            temp += ' leak'
          }
          if(pharmacy_leak.indexOf(d.properties.name) != -1){
            temp += ' pharmacy'
          }
          return temp
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
        .attr('class', function(d){
          var temp = 'country'
          if(dessert_leak.indexOf(d.properties.name) != -1){
            temp += ' dessert'
          }
          if(dessert_rich.indexOf(d.properties.name) != -1){
            temp += ' rich'
          }
          return temp
        })
        .attr('id', function(d){
          return d.properties.name
        })
        .attr('fill', function(d){
          return '#EF4326';
        })
        .attr('fill-opacity', '0')
        .attr('stroke', '#B5B5B6')
        .attr('stroke-opacity', '1')
        .attr('stroke-width', '0.5')

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

        d3.csv('./static/hospital.csv?V=1', function(data){
          console.log(data)
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
              'class': function(d){
                return d.location.substr(0, 3) + ' point'
              },
              'r': 0
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
                    return prj([121.5372118, 25.0385771])[0]
                  },
                  'cy': function(d){
                    return prj([121.5372118, 25.0385771])[1]
                  },
                  'id': '帝寶',
                  'class': 'point-s map4',
                  'r': 2
                })

            svg.append('text')
                .attr({
                  'x': function(d){
                    return prj([121.5372118, 25.0385771])[0]
                  },
                  'y': function(d){
                    return prj([121.5372118, 25.0385771])[1]
                  },
                  'id': 'dibow',
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
      this.mapScale = true
      this.mapTranslate.x = this.main[d].x
      this.mapTranslate.y = this.main[d].y
      $('.point').css('stroke', 'none')
      $('.' + this.main[d].location).css('stroke', '#000000')
    },
    handleScroll: function(e){
      let currentH = window.pageYOffset
      var map = currentH - $('#map-contain').offset().top + window.innerHeight
      console.log(map)
      console.log(currentH, $('#r-1').offset().top)
      if(map < window.innerHeight - 200){
        this.mapShow = false
        this.mapSelect = false
        circle.transition().attr({'r': 0})
      }
      else if(map >= window.innerHeight - 200 && map < window.innerHeight * 2){
        this.mapShow = true
        this.mapSelect = true
        this.mapScale = false
        this.tooltipShow = false
        this.mapTranslate.x = 0
        this.mapTranslate.y = 0
        $('.town').css('stroke-opacity', '0')
        $('.leak').css('fill-opacity', '0')
        circle.transition().attr({'r': 2})
      }

      if(currentH + window.innerHeight/2 >= $('#r-1').offset().top + pagePadding && currentH + window.innerHeight < $('#r-3').offset().top + pagePadding){
        this.mapShow = false
        this.mapSelect = false
        this.mapScale = true
        this.tooltipShow = true
        this.mapTranslate.x = '-73px'
        this.mapTranslate.y = '-45px'
        this.selectedCountry = this.main[15]
        $('.town').css('stroke-opacity', '0')
        $('.leak').css('fill-opacity', '0')
        $('.point-s').css('opacity', '0')
        $('#國軍花蓮總醫院附設民眾診療服務處').attr('r', 2)
        $('#佛教慈濟醫療財團法人花蓮慈濟醫院').attr('r', 2)
        $('#臺灣基督教門諾會醫療財團法人門諾醫院').attr('r', 2)
        $('.country').css('fill-opacity', '')
        $('.point').css('fill', '')
        $('.point-s').css('fill', '')
        $('.road').css('stroke-dashoffset', '')
        $('.svg-text').css('opacity', 0)
      }

      if(currentH + window.innerHeight >= $('#r-3').offset().top + pagePadding && currentH + window.innerHeight < $('#r-4').offset().top + pagePadding){
        this.mapShow = false
        this.mapScale = true
        this.tooltipShow = false
        this.mapTranslate.x = '-61px'
        this.mapTranslate.y = '-70px'        
        $('.leak').css('fill-opacity', '0')
        $('.town').css('stroke-opacity', '0')
        $('.point-s').css('opacity', '0')
        $('.road').css('opacity', 1)
        $('.point').attr('r', 0)
        $('#臺灣基督教門諾會醫療財團法人門諾醫院').attr('r', 2)
        $('.country').css('fill-opacity', '')
        $('#花蓮縣').css('fill-opacity', '0.7')
        $('.point').css('fill', '')
        $('.point-s').css('fill', '')
        $('#臺灣基督教門諾會醫療財團法人門諾醫院').css('fill', '#000000')
        $('#馬偕紀念醫院台東分院').css('fill', '')
        $('#六十石山').css('fill', '#000000')
        $('.road').css('stroke-dashoffset', '')
        $('#test').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map1').css('opacity', 1)
      }

      if(currentH + window.innerHeight >= $('#r-4').offset().top + pagePadding && currentH + window.innerHeight < $('#r-5').offset().top + pagePadding){
        this.mapShow = false
        this.mapScale = true
        this.tooltipShow = false
        this.mapTranslate.x = '-20px'
        this.mapTranslate.y = '-180px'        
        $('.leak').css('fill-opacity', '0')
        $('.town').css('stroke-opacity', '0')
        $('.point-s').css('opacity', '0')
        $('.road').css('opacity', 1)
        $('.point').attr('r', 0)
        $('#馬偕紀念醫院台東分院').attr('r', 2)
        $('.country').css('fill-opacity', '')
        $('#臺東縣').css('fill-opacity', '0.7')
        $('.point').css('fill', '')
        $('.point-s').css('fill', '')
        $('#馬偕紀念醫院台東分院').css('fill', '#000000')
        $('#金城武樹').css('fill', '#000000')
        $('.road').css('stroke-dashoffset', '')
        $('#test2').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map2').css('opacity', 1)
      }

      if(currentH + window.innerHeight >= $('#r-5').offset().top + pagePadding && currentH + window.innerHeight < $('#r-6').offset().top + pagePadding){
        this.mapShow = false
        this.mapScale = true
        this.tooltipShow = false
        this.mapTranslate.x = '56px'
        this.mapTranslate.y = '-265px'        
        $('.leak').css('fill-opacity', '0')
        $('.town').css('stroke-opacity', '0')
        $('.point-s').css('opacity', '0')
        $('.road').css('opacity', 1)
        $('.point').attr('r', 0)
        $('#輔英科技大學附設醫院').attr('r', 2)
        $('.country').css('fill-opacity', '')
        $('#屏東縣').css('fill-opacity', '0.7')
        $('.point').css('fill', '')
        $('.point-s').css('fill', '')
        $('#輔英科技大學附設醫院').css('fill', '#000000')
        $('#墾丁大街').css('fill', '#000000')
        $('.road').css('stroke-dashoffset', '')
        $('#test3').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map3').css('opacity', 1)
        $('#臺北市').css('fill', '')
      }

      if(currentH + window.innerHeight >= $('#r-6').offset().top + pagePadding && currentH + window.innerHeight < $('#r-7').offset().top + pagePadding){
        this.mapShow = false
        this.mapScale = true
        this.tooltipShow = false
        this.mapTranslate.x = '-78px'
        this.mapTranslate.y = '155px'        
        $('.leak').css('fill-opacity', '0')
        $('.town').css('stroke-opacity', '0')
        $('.point-s').css('opacity', '0')
        $('.road').css('opacity', 1)
        $('.point').attr('r', 0)
        $('#國立台灣大學醫學院附設醫院').attr('r', 2)
        $('.country').css('fill-opacity', '')
        $('#臺北市').css('fill', '#EF4326')
        $('#臺北市').css('fill-opacity', '0.7')
        $('.point').css('fill', '')
        $('.point-s').css('fill', '')
        $('#國立台灣大學醫學院附設醫院').css('fill', '#000000')
        $('#帝寶').css('fill', '#000000')
        $('.road').css('stroke-dashoffset', '')
        $('#test4').css('stroke-dashoffset', 0)
        $('.svg-text').css('opacity', 0)
        $('.map4').css('opacity', 1)
        $('.pharmacy').css('fill-opacity', '')
        $('#臺北市').css('fill', '')
      }

      if(currentH + window.innerHeight >= $('#r-7').offset().top + pagePadding && currentH + window.innerHeight < $('#r-8').offset().top + pagePadding){
        this.mapShow = true
        this.mapScale = false
        this.mapTranslate.x = 0
        this.mapTranslate.y = 0
        this.mapcontent = '52鄉鎮沒健保藥局 36.8萬人受影響'
        this.mapsay = '資料來源：中央健保署健保特約醫療院所查詢系統、內政部戶政司'
        this.mapsource = '統計時間：2017/12/13'
        $('.point').attr('r', 0)
        $('.point-s').css('opacity', '0')
        $('.road').css('stroke-dashoffset', '')
        $('.town').css('stroke-opacity', '1')
        $('.svg-text').css('opacity', 0)
        $('.pharmacy').css('fill-opacity', '1')
        $('.country').css('fill-opacity', '')
      }

      if(currentH + window.innerHeight >= $('#r-8').offset().top + pagePadding && currentH + window.innerHeight < $('#r-9').offset().top + pagePadding){
        this.mapShow = true
        this.mapScale = false
        this.mapTranslate.x = 0
        this.mapTranslate.y = 0
        this.mapcontent = '15個超高齡鄉鎮 領藥難上加難'
        $('.point').attr('r', 0)
        $('.point-s').css('opacity', '0')
        $('.road').css('stroke-dashoffset', '')
        $('.town').css('stroke-opacity', '1')
        $('.svg-text').css('opacity', 0)
        $('.pharmacy').css('fill-opacity', '1')
        $('.country').css('fill-opacity', '')
      }

      if(currentH + window.innerHeight >= $('#r-9').offset().top + pagePadding && currentH + window.innerHeight < $('#r-10').offset().top + pagePadding){
        this.mapShow = true
        this.mapScale = false
        this.mapTranslate.x = 0
        this.mapTranslate.y = 0
        this.mapcontent = '141鄉鎮缺緊急醫療資源 轉診像賭命'
        this.mapsay = '資料來源：衛生福利部'
        $('.point').attr('r', 0)
        $('.point-s').css('opacity', '0')
        $('.road').css('stroke-dashoffset', '')
        $('.town').css('stroke-opacity', '1')
        $('.svg-text').css('opacity', 0)
        $('.pharmacy').css('fill-opacity', '0')
        $('.leak').css('fill-opacity', '1')
        $('.country').css('fill-opacity', '')
      }

      if(currentH + window.innerHeight >= $('#r-11').offset().top + pagePadding && currentH + window.innerHeight < $('#r-12').offset().top + pagePadding){
        this.mapShow = true
        this.mapScale = false
        this.mapScaleBig = false
        this.boardShow = false
        this.mapTranslate.x = 0
        this.mapTranslate.y = 0
        this.mapcontent = ''
        this.mapsay = '資料來源：衛福部、內政部、記者整理'
        $('.town').css('stroke-opacity', '0')
        $('.town').css('fill-opacity', '')
        $('.pharmacy').css('fill-opacity', '')
        $('.dessert').css('fill-opacity', '1')
        $('.rich').css('fill-opacity', '1')
      }

      if(currentH + window.innerHeight/2 >= $('#r-12').offset().top + pagePadding && currentH + window.innerHeight < $('#r-13').offset().top + pagePadding){
        this.mapShow = false
        this.mapScale = false
        this.mapScaleBig = true
        this.boardShow = true
        this.mapTranslate.x = '-100px'
        this.mapTranslate.y = '182px'
        this.selectedCountry = this.main[17]
        $('.town').css('stroke-opacity', '0')
        $('.town').css('fill-opacity', '')
        $('.pharmacy').css('fill-opacity', '')
        $('.country').css('fill-opacity', '')
        $('.dessert').css('fill-opacity', '1')
      }

      if(currentH + window.innerHeight/2 >= $('#r-13').offset().top + pagePadding && currentH + window.innerHeight < $('#r-14').offset().top + pagePadding){
        this.mapShow = false
        this.mapScale = false
        this.mapScaleBig = true
        this.boardShow = true
        this.mapTranslate.x = '-83px'
        this.mapTranslate.y = '173px'
        this.selectedCountry = this.main[1]
        $('.country').css('fill-opacity', '')
        $('.rich').css('fill-opacity', '1')
      }

      if(currentH + window.innerHeight/2 >= $('#r-14').offset().top + pagePadding && currentH + window.innerHeight < $('#r-15').offset().top + pagePadding){
        this.mapShow = false
        this.mapScale = false
        this.mapScaleBig = true
        this.boardShow = true
        this.mapTranslate.x = '73px'
        this.mapTranslate.y = '-65px'
        this.selectedCountry = this.main[19]
        $('.country').css('fill-opacity', '')
        $('.rich').css('fill-opacity', '1')
      }
     
    },
    expand: function(){
      this.mapmenu = !this.mapmenu
    }
  },
  components: {
    Indicator, HeadBar, Cover, ContentContainer, Quote, Section, Share, Editor, Relate, FBComment, Foot, Logo
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

.img-contain img{
  width: 100%;
}

.doctor{
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  position: relative;
}

.doctor-text{
  position: relative;
}

.doctor-underline{
  width: 240px;
  height: 10px;
  position: absolute;
  top: 25px;
  z-index: 0;
  left: 50%;
  background: #EF4326;
  margin-left: -120px;
}

.people{
  height: 100px;
}

.people-img{
  width: 100px;
  height: 100px;
  float: left;
}

.people-name{
  height: 100px;
  padding-left: 120px;
  padding-top: 35px;
  border-bottom: 1px solid #B5B5B5;
}

.rich{
  fill: #26CAD3;
}

.dessert{
  fill: #EF4326;
}

.number{
  font-size: 26px;
  color: #EF4326;
  font-weight: bold;
}

.town.leak{
 fill: #EF4326;
}

.town.pharmacy{
  fill: #EF4326;
}

#dibow{
  transform: translate(15px, 2px);
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
  stroke:#000000;
  stroke-width: 5;
  transition: all 0.7s ease;
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
  stroke-width: 0.25;
  transition: all 0.7s ease;
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
  transition: all 0.7s ease;
}

.zoomIn{
  transform: scale(2.5);
}

.zoomInBig{
  transform: scale(5);
}

.country{
  transition: all 0.7s ease;
}

.circle{
  width: 7px;
  height: 7px;
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 0;
  border-radius: 50%;
  background-color: #EF4326;
}

#map-say{
  position: fixed;
  width: 150px;
  text-align: left;
  right: 20px;
  bottom: 10%;
  font-size: 11px;
  color: #A4A2A2;
  padding-left: 10px;
  transition: opacity 0.7s ease;
  opacity: 0;
  z-index: -1;
}

#map-say.show{
  opacity: 1;
}

#map-content{
  top: -3%;
  z-index: -1;
  position: fixed;
  transition: opacity 0.7s ease;
  opacity: 0;
}

#map-content.show{
  opacity: 1;
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
  top: 140px;
  border-bottom: 1px solid #AAAAAA;
  font-size: 15px;
  color: #828282;
  transition: all 0.7s ease;
  /* background-color: #FFFFFF; */
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
  bottom: 75px;
  right: 10px;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.7s ease;
  z-index: -1;
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

#map-board{
  position: fixed;
  width: 300px;
  left: 50%;
  margin-left: -150px;
  bottom: 20%;
  height: 215px;
  background: white;
  padding: 20px;
  opacity: 0;
  transition: all 0.7s ease;
  z-index: -1;
}

#map-board.show{
  opacity: 1;
}

#board-title{
  font-weight: bold;
  font-size: 26px;
  color: #4D4D4D;
}

#board-text-s{
  margin-top: 10px;
}

#dessertNumber{
  font-size: 40px;
}

.board-text{
  font-size: 18px;
  color: #4D4D4D;
  line-height: 32px;
}

.board-text span{
  position: absolute;
  right: 19px;
  color: #F15A24;
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
