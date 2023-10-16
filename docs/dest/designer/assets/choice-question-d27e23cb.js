const e="/el-lowcode/designer/assets/choice-question-200f5adf.png",a={id:"choice-question",title:"选择填空",cover:e,schema:()=>({children:[{is:"Form",_id:"15870304-528c-4f18-b4c2-7529dcb30837",labelWidth:"20",style:{overflow:"hidden"},children:[{is:"h2",_id:"44ad8bba-071b-4e13-ba07-a1fe02cc8c21",children:"选择题"},{is:"p",_id:"e8528607-9d5c-4d57-b770-8f9be6017490",children:"1. 哪一个是正确的？"},{is:"Code",_id:"c63abc01-0ace-492e-8215-f35828d04e87",children:`const bird = {
  size: 'small'
}

const mouse = {
  name: 'Mickey',
  small: true
}`,style:{"margin-left":"20px"}},{is:"ElFormItemRender",_id:"926bd712-0d10-476f-9dac-7bec3b29bbbd",label:"",prop:"radio1",defaultValue:"",options:[{label:"A. mouse.bird.size 是无效的",value:"a"},{label:"B. mouse[bird.size] 是无效的",value:"b"},{label:'C. mouse[bird["size"]] 是无效的',value:"c"},{label:"D. 以上三个选项都是有效的",value:"d"}],el:{is:"ElRadioGroup",type:!1,size:"default",disabled:!1}},{is:"p",_id:"e1e4b887-c9e5-4b9e-ac0c-a2fdf97f8de4",children:"2. 下面打印正确的是"},{is:"Code",_id:"6b90872c-62a1-4aa3-a0f7-6bbffbcf5c5f",children:`var obj = {}; 
console.log(delete obj.p)`,style:{"margin-left":"20px"}},{is:"ElFormItemRender",_id:"d0223601-ea5f-4126-bbf6-c44f127f12a7",label:"",prop:"radio2",defaultValue:"",options:[{label:"A. true",value:"a"},{label:"B. false",value:"b"},{label:"C. 报错",value:"c"},{label:"D. undefined",value:"d"}],el:{is:"ElRadioGroup",type:!1}},{is:"p",_id:"d1e766ab-f61e-4544-9f81-486ecc685a0f",children:"3. 下面打印正确的是"},{is:"Code",_id:"8544bf64-b2a9-4f4d-a452-a0f50f274730",children:`var f = function () { console.log('1'); } 
function f() { console.log('2'); } 
f()`,style:{"margin-left":"20px"}},{is:"ElFormItemRender",_id:"9cf4adc2-e749-4e7b-815b-ea2cbb028f70",label:"",prop:"radio3",defaultValue:"",options:[{label:"A. 1",value:"a"},{label:"B. 2",value:"b"},{label:"C. 报错",value:"c"},{label:"D. undefined",value:"d"}],el:{is:"ElRadioGroup",type:!1}},{is:"h2",_id:"206f027a-5269-4a72-963f-b8921014d8f8",children:"填空题"},{is:"p",_id:"d2ebe941-821c-4c6d-9c00-f16be7aa3c8b",children:"1. 下面打印 name 值是什么"},{is:"Code",_id:"97d169a7-6bec-4786-a324-34c2514caa95",children:`var name = "jimmy";
var a = {
    name: "chimmy",
    fn : function () {
        console.log(this.name); 
    }
}
a.fn();`,style:{"margin-left":"20px"}},{is:"ElFormItemRender",_id:"55b8615d-c60e-4ae3-a631-e160c405f59c",label:"",prop:"input1",defaultValue:"",el:{is:"ElInput",placeholder:"答"}}],model:"{{state.formData}}"}],state:{count:0,formData:{}},is:"Page",_id:"13f4e3cc-2aca-4f04-8507-f9d52411a34a",style:{padding:"12px"}})};export{a as default};
