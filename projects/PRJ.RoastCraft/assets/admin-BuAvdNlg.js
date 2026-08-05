import{t as e}from"./dist-DH-byRI5.js";var t=e(`https://fpxcogiilbmryejajjju.supabase.co`,`sb_publishable_pg1EJJ3mXI5yJ4oW-vw56w_5kTk24nP`),n=document.getElementById(`loginSection`),r=document.getElementById(`dashboardSection`),i=document.getElementById(`loginForm`),a=document.getElementById(`btnLogout`),o=document.getElementById(`inquiryList`),s=document.getElementById(`statTotal`),c=document.getElementById(`statPending`),l=document.getElementById(`statDone`),u=document.getElementById(`messageModal`),d=document.getElementById(`closeModal`),f=document.getElementById(`modalName`),p=document.getElementById(`modalPhone`),m=document.getElementById(`modalLocation`),h=document.getElementById(`modalMessageText`);i.addEventListener(`submit`,async e=>{e.preventDefault();let a=document.getElementById(`email`).value,o=document.getElementById(`password`).value,s=i.querySelector(`button`);s.innerText=`CHECKING...`;let{data:c,error:l}=await t.auth.signInWithPassword({email:a,password:o});l?(console.error(`Login Error:`,l.message),alert(`로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.`),s.innerText=`LOGIN`):(n.style.display=`none`,r.style.display=`block`,g())}),a.addEventListener(`click`,async()=>{await t.auth.signOut(),window.location.reload()});async function g(){o.innerHTML=`<tr><td colspan="8" style="text-align:center; padding:3rem;">데이터를 불러오는 중입니다...</td></tr>`;try{let{data:e,error:n}=await t.from(`franchise_inquiries`).select(`*`).order(`created_at`,{ascending:!1});if(n)throw n;_(e),v(e)}catch(e){console.error(`Fetch Error:`,e),o.innerHTML=`<tr><td colspan="8" style="text-align:center; color:red;">데이터 로드 실패</td></tr>`}}function _(e){s.innerText=e.length,c.innerText=e.filter(e=>e.status===`대기중`||!e.status).length,l.innerText=e.filter(e=>e.status===`완료`).length}function v(e){if(!e||e.length===0){o.innerHTML=`<tr><td colspan="8" style="text-align:center; padding:3rem;">아직 접수된 문의가 없습니다.</td></tr>`;return}o.innerHTML=e.map((t,n)=>{let r=new Date(t.created_at).toLocaleDateString(`ko-KR`),i=t.status||`대기중`,a=t.name?t.name.replace(/"/g,`&quot;`):``,o=t.phone?t.phone.replace(/"/g,`&quot;`):``,s=t.location?t.location.replace(/"/g,`&quot;`):``,c=t.message?t.message.replace(/"/g,`&quot;`):``;return`
      <tr>
        <td><span style="font-family: var(--font-en-display); background: #eee; padding: 2px 8px; border-radius: 4px;">${e.length-n}</span></td>
        <td style="font-weight: 600;">${t.name}</td>
        <td>${t.phone}</td>
        <td>${t.location}</td>
        
        <!-- [완벽 수정] 메시지 영역 (Flex 구조 적용) -->
        <td>
          <div class="msg-cell-wrapper">
            <span class="msg-preview">${t.message||`-`}</span>
            <button class="btn-view-more" 
              data-name="${a}" 
              data-phone="${o}" 
              data-location="${s}" 
              data-message="${c}">
              더보기
            </button>
          </div>
        </td>

        <td>${r}</td>
        <td>
          <select class="status-select" data-id="${t.id}">
            <option value="대기중" ${i===`대기중`?`selected`:``}>대기중</option>
            <option value="상담중" ${i===`상담중`?`selected`:``}>상담중</option>
            <option value="완료" ${i===`완료`?`selected`:``}>완료</option>
          </select>
        </td>
        <td>
          <button class="btn-delete" data-id="${t.id}">삭제</button>
        </td>
      </tr>
    `}).join(``),y()}function y(){document.querySelectorAll(`.status-select`).forEach(e=>{e.addEventListener(`change`,async e=>{let n=e.target.getAttribute(`data-id`),r=e.target.value,{error:i}=await t.from(`franchise_inquiries`).update({status:r}).eq(`id`,n);i?(console.error(`Update Error:`,i),alert(`상태 업데이트에 실패했습니다.`)):g()})}),document.querySelectorAll(`.btn-delete`).forEach(e=>{e.addEventListener(`click`,async e=>{if(confirm(`이 문의 내역을 영구적으로 삭제하시겠습니까?`)){let n=e.target.getAttribute(`data-id`),{error:r}=await t.from(`franchise_inquiries`).delete().eq(`id`,n);r?(console.error(`Delete Error:`,r),alert(`삭제에 실패했습니다.`)):g()}})}),document.querySelectorAll(`.btn-view-more`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-name`),n=e.target.getAttribute(`data-phone`),r=e.target.getAttribute(`data-location`),i=e.target.getAttribute(`data-message`);f.textContent=t,p.textContent=n,m.textContent=r,h.textContent=i||`내용이 없습니다.`,u.classList.add(`is-active`)})})}d&&d.addEventListener(`click`,()=>{u.classList.remove(`is-active`)}),u&&u.addEventListener(`click`,e=>{e.target===u&&u.classList.remove(`is-active`)});