import{S as L,i as y}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const f="44834659-67420821c74452072565be409",v=async e=>{try{const t=encodeURIComponent(e);return await axios.get(`https://pixabay.com/api/?key=${f}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=1`)}catch(t){throw new Error(t.message)}},$=async(e,t)=>{try{const a=encodeURIComponent(e),o=await axios.get(`https://pixabay.com/api/?key=${f}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${t}`);if(o.data.hits.length===0)throw new Error;return o}catch{throw new Error}},m=async(e,t)=>{const a=e.map(o=>`<li class="gallery-item">
            <a class="gallery-link" href="${o.largeImageURL}">
                <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}"/>
            </a>
            <ul class="info-summary">
                <li class="info-item"><h3 class="info-title">Likes</h3><p class="info-statistics">${o.likes}</p></li>
                <li class="info-item"><h3 class="info-title">Views</h3><p class="info-statistics">${o.views}</p></li>
                <li class="info-item"><h3 class="info-title">Comments</h3><p class="info-statistics">${o.comments}</p></li>
                <li class="info-item"><h3 class="info-title">Downloads</h3><p class="info-statistics">${o.downloads}</p></li>
            </ul>
        </li>`).join("");t.insertAdjacentHTML("beforeend",a)},S=document.querySelector(".form"),l=document.querySelector(".gallery"),i=document.querySelector(".loader"),n=document.querySelector(".load-more-btn"),g=new L(".gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250});let c="",u=1;const w=15,d=e=>{e.target.elements.search.value=""},h=e=>{e.innerHTML=""},b=e=>{e==="aboveGallery"?l.parentNode.insertBefore(i,l):e==="aboveLoadMore"&&n.parentNode.insertBefore(i,n),i.style.display="block"};S.addEventListener("submit",async e=>{if(e.preventDefault(),b("aboveGallery"),n.style.display="block",c=e.target.elements.search.value.trim(),u=1,c.length<=0)return i.style.display="none",h(l),d(e),n.style.display="none",y.error({title:"Error",message:"Search value is empty",position:"topRight"});try{const t=await v(c);if(i.style.display="none",t.data.totalHits===0)throw e.target.elements.search.value="",new Error("No images found");return h(l),await m(t.data.hits,l),d(e),g.refresh(),t.data.hits.length<w&&(n.style.display="none",y.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),c}catch(t){n.style.display="none",i.style.display="none",y.error({title:"Error",message:`Sorry, there are no images matching your search query. Please try again! Error: ${t.message}`,position:"topRight"}),d(e),h(l)}});n.addEventListener("click",async()=>{u+=1,b("aboveLoadMore");try{const e=await $(c,u);i.style.display="none";let t=e.data.hits.length;if(t>0){await m(e.data.hits,l);const a=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:a,behavior:"smooth"}),g.refresh()}t<w&&(n.style.display="none",y.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{n.style.display="none",i.style.display="none",y.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}});
//# sourceMappingURL=commonHelpers.js.map
