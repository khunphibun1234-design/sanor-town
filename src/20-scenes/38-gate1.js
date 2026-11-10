/* ===== Our school: Phibunmangsahan School · Gate 1 (prototype) =====
   Layout follows the teacher's 3D campus map: Thetsaban 2 road in front, the school name sign beside Gate 1,
   the small pavilion behind the sign, the guard booth inside the gate and buildings 7-8 behind (no motorcycle shed: the teacher says there is none here).
   NPC names are made up (not real staff or students).
   Seen from the road, the sign is on the RIGHT and Gate 1 on the LEFT, as at the real school (teacher's correction, 28 Oct 2569).
   The build code below is written the other way round and then flipped with mirrorWorld();
   the decals and NPCs below already use the final (flipped) x values. */
SCENES.push({id:'gate1',name:'School Gate 1 · Phibun School',th:'ประตู 1 โรงเรียนพิบูลมังสาหาร',color:'#23407A',orbit:true,
 exits:[{x0:-10,x1:-4,z0:-9.2,z1:-8.25,to:'flagpole',at:[0,6.6,Math.PI]},/* walk to the back of the school yard to reach the dome: arrive on the front walkway, facing the flagpole */
  {x0:-7.7,x1:-4.3,z0:10.6,z1:11.2,to:'market2',at:[0,1.4,0]}],/* cross on the zebra crossing to reach the street market */
