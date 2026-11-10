/* 1 Market (built earlier) */
SCENES.push({id:'market',name:'Market',th:'ตลาด',fx:true,color:'#E4572E',spawn:[0,2.6,Math.PI],bounds:[-14.2,14.2,-10.2,10.2],
 build(){return{a:townWorld(),ob:TOWN_OBST}},npcs:TOWN_NPCS});
