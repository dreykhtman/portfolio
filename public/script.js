const getIdentifier=str=>str.split("--").pop();const scrollToTop=()=>{window.scrollTo({top:0})};document.getElementById("btn-scroll").addEventListener("click",scrollToTop);const btnEmail=document.getElementById("btn-email");const showEmail=()=>{const contact=document.getElementById("contact");const html='<a href="mailto:dreykhtman@gmail.com">dreykhtman@gmail.com</a>';contact.insertAdjacentHTML("beforeend",html);btnEmail.hidden=true};btnEmail.addEventListener("click",showEmail);const screenshotContainers=document.querySelectorAll(".screenshot-container");const descriptions=document.querySelectorAll(".description");const descriptionList={};descriptions.forEach((description=>{const arrows=document.getElementById(`arrows--${getIdentifier(description.id)}`);descriptionList[description.id]=[description,arrows]}));const timeoutIDs={};const observerCallback=entries=>{entries.forEach((entry=>{if(entry.isIntersecting){entry.target.querySelector("img").classList.add("active");clearTimeout(timeoutIDs[entry.target.id]);descriptionList[`description--${getIdentifier(entry.target.id)}`].forEach((element=>{element.classList.add("visible")}))}else{descriptionList[`description--${getIdentifier(entry.target.id)}`].forEach((element=>{element.classList.remove("visible")}));timeoutIDs[entry.target.id]=setTimeout((()=>{entry.target.querySelector("img").classList.remove("active")}),400)}}));drawArrows()};const options={root:null,rootMargin:"-50% 0% -50% 0%",threshold:0};const observer=new IntersectionObserver(observerCallback,options);screenshotContainers.forEach((container=>{observer.observe(container)}));const arrowheadRatios={nav:[.02,.84],player:[.89,.75],sticky:[.25,.25],svg:[.24,.71],domrect:[.888,.631],checkmark:[.27,.12]};const elementMap=new Map;document.querySelectorAll('img[id^="screenshot--"]').forEach((screenshot=>elementMap.set(screenshot,{fromElements:document.querySelectorAll(`span[id^=from-${getIdentifier(screenshot.id)}`),svgArrows:[...document.querySelectorAll(`path[id^=svg-${getIdentifier(screenshot.id)}]`)].reduce(((obj,element)=>({...obj,[getIdentifier(element.id)]:element})),{})})));class Arrow{constructor(fromElement,toImage,xRatio,yRatio){({p0x:this.p0x,p0y:this.p0y}=Arrow.getP0(fromElement));({p3x:this.p3x,p3y:this.p3y}=Arrow.getP3(toImage,xRatio,yRatio));({p1x:this.p1x,p1y:this.p1y,p2x:this.p2x,p2y:this.p2y}=Arrow.getP1P2(this.p0x,this.p0y,this.p3x,this.p3y))}static getP0(fromElement){let{right:right,left:left,bottom:bottom}=fromElement.getBoundingClientRect();[right,left,bottom]=[right,left,bottom].map((num=>Math.trunc(num)));return{p0x:Math.trunc((left+right)/2),p0y:bottom}}static getP3(toImage,xRatio,yRatio){let{right:right,left:left,top:top,bottom:bottom}=toImage.getBoundingClientRect();[right,left,top,bottom]=[right,left,top,bottom].map((num=>Math.trunc(num)));const p3x=Math.trunc((right-left)*xRatio+left);const p3y=Math.trunc((bottom-top)*yRatio+top);return{p3x:p3x,p3y:p3y}}static getP1P2(p0x,p0y,p3x,p3y){const distance=Math.trunc(Math.sqrt((p3x-p0x)**2+(p3y-p0y)**2));return{p1x:p0x,p1y:p0y+Math.trunc(distance/4),p2x:p3x-Math.trunc(distance/3),p2y:p3y+Math.trunc(distance/15)}}}const drawArrows=()=>{elementMap.forEach(((elements,screenshot)=>{if(screenshot.classList.contains("active")){elements.fromElements.forEach((from=>{const arrow=new Arrow(from,screenshot,...arrowheadRatios[getIdentifier(from.id)]);elements.svgArrows[getIdentifier(from.id)].setAttribute("d",`M ${arrow.p0x} ${arrow.p0y} C ${arrow.p1x} ${arrow.p1y} ${arrow.p2x} ${arrow.p2y} ${arrow.p3x} ${arrow.p3y}`)}))}}))};document.addEventListener("scroll",(()=>{drawArrows()}));window.addEventListener("resize",(()=>{drawArrows()}));