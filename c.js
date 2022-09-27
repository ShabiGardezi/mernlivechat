
const d=new Date("2022-09-23T16:01:54.784Z").toLocaleTimeString();
let [h,m,s]=d.split(":")
let [se,p]=s.split(" ")
let time=h+":"+m+" "+p;
console.log(time)
// console.log(d)