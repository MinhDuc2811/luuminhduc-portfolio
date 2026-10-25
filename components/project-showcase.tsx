'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { proposalContent, type Locale } from '@/lib/proposal-content'
import { PROJECTS } from '@/lib/work-data'
import { trackEvent } from '@/lib/analytics'

const stories = {
  vi: [
    { problem: 'Làm thế nào để người dùng có thể tin tưởng nhau khi cho thuê và tái sử dụng đồ dùng?', result: 'Nhóm xây dựng luồng thuê với xác minh danh tính, hợp đồng điện tử và kiểm duyệt nội dung bằng AI.', flow: ['Xác minh danh tính', 'Thuê & chia sẻ', 'Hợp đồng điện tử'] },
    { problem: 'Kết nối người mua với thực phẩm lành mạnh, đồng thời hỗ trợ cả luồng đặt hàng sỉ.', result: 'Nhóm xây dựng luồng mua hàng MERN với VNPay, khuyến mãi tự hết hạn, chatbot Gemini và triển khai Docker + Linux.', flow: ['Chọn sản phẩm', 'Thanh toán VNPay', 'Vận hành đơn hàng'] },
  ],
  en: [
    { problem: 'How can people trust each other when renting, sharing, and reusing everyday items?', result: 'The team built a rental flow with identity verification, electronic contracts, and AI content moderation.', flow: ['Verify identity', 'Rent & share', 'Electronic contract'] },
    { problem: 'Connect people with healthy food while supporting wholesale orders as well as everyday purchases.', result: 'The team built a MERN purchase flow with VNPay, expiring discounts, a Gemini chatbot, and Docker + Linux deployment.', flow: ['Choose products', 'Pay with VNPay', 'Manage orders'] },
  ],
} as const

export default function ProjectShowcase({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<number | null>(null)
  const projects = proposalContent[locale].s6.projects
  const vi = locale === 'vi'
  return <>
    <p className="project-explore-hint">{vi ? 'Bước vào từng dự án để xem câu chuyện phía sau sản phẩm.' : 'Step inside a project to explore the story behind the build.'}</p>
    <div className="grid md:grid-cols-2 gap-3">
      {projects.map((project, i) => <article key={project.name} className="story-project-card">
        <button type="button" className="story-project-preview" aria-label={vi ? `Khám phá ${project.name}` : `Explore ${project.name}`} onClick={() => { setSelected(i); trackEvent('project_story_open', { project: project.name }) }}>
          <span className="project-window-bar" aria-hidden="true"><i /><i /><i /><span>~/projects/{project.name.toLowerCase()}</span></span>
          <span className="project-shot"><Image src={PROJECTS[i].image} alt={`${project.name} ${vi ? '— giao diện sản phẩm' : '— product interface'}`} fill sizes="(max-width: 768px) 90vw, 440px" className="object-cover object-top" /></span>
          <span className="project-open-label">{vi ? 'Khám phá câu chuyện' : 'Explore the build'} <span aria-hidden="true">↗</span></span>
        </button>
        <div className="story-project-copy"><div className="project-title-row"><h3>{project.name}</h3><span>{project.period}</span></div><p className="project-role">{project.role}</p>
          <p className="project-problem">{stories[locale][i].problem}</p>
          <div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
          <div className="project-links">{PROJECTS[i].links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('project_link_click', { project: project.name, type: link.label, location: 'story' })}>[{link.label}]</a>)}</div>
        </div>
      </article>)}
    </div>
    {selected !== null && <ProjectStory key={selected} locale={locale} index={selected} onClose={() => setSelected(null)} />}
  </>
}

function ProjectStory({ locale, index, onClose }: { locale: Locale; index: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const project = proposalContent[locale].s6.projects[index]
  const story = stories[locale][index]
  const vi = locale === 'vi'
  useEffect(() => {
    const node = dialog.current
    node?.showModal()
    return () => node?.close()
  }, [])
  return <dialog ref={dialog} className="project-story-dialog" aria-labelledby="project-story-title" onCancel={onClose}>
    <div className="project-story-heading"><p>{vi ? 'TỪ Ý TƯỞNG ĐẾN SẢN PHẨM' : 'FROM IDEA TO PRODUCT'}</p><button type="button" onClick={onClose} aria-label={vi ? 'Đóng câu chuyện dự án' : 'Close project story'} autoFocus>×</button></div>
    <div className="project-story-image"><Image src={PROJECTS[index].image} alt={`${project.name} ${vi ? '— ảnh chụp giao diện' : '— interface screenshot'}`} fill sizes="(max-width: 768px) 95vw, 900px" className="object-cover object-top" /></div>
    <div className="project-story-body"><h2 id="project-story-title">{project.name}</h2><p className="project-role">{project.role}</p>
      <div className="project-story-beats"><section><h3>01 / {vi ? 'Bài toán' : 'The challenge'}</h3><p>{story.problem}</p></section><section><h3>02 / {vi ? 'Vai trò của tôi' : 'My role'}</h3><p>{project.role}</p><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div></section><section><h3>03 / {vi ? 'Sản phẩm của nhóm' : 'The team’s build'}</h3><p>{story.result}</p></section></div>
      <ol className="project-flow" aria-label={vi ? 'Luồng sản phẩm' : 'Product flow'}>{story.flow.map((step, i) => <li key={step}><span>{i + 1}</span>{step}</li>)}</ol>
      <div className="project-story-actions">{PROJECTS[index].links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label === 'live' ? (vi ? 'Mở sản phẩm ↗' : 'Open live project ↗') : (vi ? 'Xem mã nguồn ↗' : 'Explore the code ↗')}</a>)}</div>
    </div>
  </dialog>
}
