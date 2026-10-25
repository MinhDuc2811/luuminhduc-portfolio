import type { Locale } from './proposal-content'

export type StoryChapter = { title: string; line: string; note: string; pose: 'map' | 'work' | 'think' | 'build' | 'pack' | 'plan' | 'wave' }

const chapters: Record<Locale, readonly StoryChapter[]> = {
  vi: [
    { title: 'Khởi hành', line: 'Mọi sản phẩm đều bắt đầu bằng một ý tưởng. Đây là hành trình của tôi.', note: 'Tôi là Đức. Đi cùng tôi qua những gì tôi đã xây dựng, cách tôi giải quyết vấn đề và nơi tôi muốn đi tiếp.', pose: 'map' },
    { title: 'Gặp người xây dựng', line: 'Trước khi xem sản phẩm, hãy gặp người đứng sau những dòng code.', note: 'Hành trình của tôi đi qua FPT University, FPT Software và BSS Commerce. Điều tôi thích là nối các mảnh frontend, backend và trải nghiệm người dùng thành một sản phẩm.', pose: 'map' },
    { title: 'Xưởng sản phẩm', line: 'Ý tưởng chỉ thực sự có ý nghĩa khi được đưa vào sử dụng.', note: 'Hai dự án tôi từng dẫn dắt: RetroTrade với nhóm 5 người và Nutigo với nhóm 4 người. Bấm vào từng dự án để xem bài toán, phần việc và luồng sản phẩm.', pose: 'work' },
    { title: 'Bài toán cần giải', line: 'Bước tiếp theo không phải viết code. Là hiểu điều đang cản trở sản phẩm.', note: 'Trong công việc với Shopify apps, tôi tái hiện lỗi trên cấu hình và theme thật của merchant, tìm nguyên nhân rồi theo đến khi họ xác nhận đã dùng được.', pose: 'think' },
    { title: 'Chọn công cụ', line: 'Từ bài toán đến giải pháp: kết nối dữ liệu, logic và giao diện.', note: 'Tôi làm việc với React/Next.js ở frontend và NodeJS/NestJS ở backend. Công cụ phục vụ sản phẩm, còn trách nhiệm của tôi là nối chúng lại.', pose: 'build' },
    { title: 'Mang đến production', line: 'Ship một tính năng cũng là nhận trách nhiệm với điều xảy ra sau đó.', note: 'Phạm vi tôi có thể đảm nhận đi từ API, admin và storefront đến realtime, tích hợp và vận hành. Một luồng sản phẩm cần được nhìn từ đầu đến cuối.', pose: 'pack' },
    { title: 'Vẽ chặng tiếp theo', line: 'Nếu cùng làm việc, 90 ngày đầu của chúng ta sẽ bắt đầu thế nào?', note: 'Đây là lộ trình đề xuất, không phải kết quả đã xảy ra: hiểu codebase, nhận tính năng độc lập, rồi tiến tới làm chủ một module.', pose: 'plan' },
    { title: 'Chương tiếp theo', line: 'Câu chuyện đến đây là của tôi. Chương tiếp theo có thể là của chúng ta.', note: 'Cảm ơn bạn đã đi cùng tôi. Bạn có thể gửi email để trao đổi hoặc xin mã truy cập CV. Các dự án luôn có thể xem trực tiếp từ mục 02.', pose: 'wave' },
  ],
  en: [
    { title: 'The starting point', line: 'Every product starts with an idea. This is my journey from there.', note: "I'm Duc. Walk with me through what I've built, how I approach problems, and where I'd like to go next.", pose: 'map' },
    { title: 'Meet the builder', line: 'Before the products, meet the person behind the code.', note: 'My path runs through FPT University, FPT Software, and BSS Commerce. I enjoy connecting frontend, backend, and user experience into one working product.', pose: 'map' },
    { title: 'The workshop', line: 'An idea becomes meaningful when someone can actually use it.', note: 'I led a team of five on RetroTrade and a team of four on Nutigo. Open a project to explore the problem, my contribution, and the product flow.', pose: 'work' },
    { title: 'Understand the challenge', line: "The next step isn't writing code. It's understanding what's in the way.", note: 'Working on Shopify apps means reproducing issues in a merchant’s real theme and configuration, finding the cause, and following through until they confirm the fix.', pose: 'think' },
    { title: 'Choose the tools', line: 'From problem to solution: connect the data, the logic, and the interface.', note: 'I work with React/Next.js on the frontend and NodeJS/NestJS on the backend. The tools serve the product; my job is to connect them.', pose: 'build' },
    { title: 'Into production', line: 'Shipping a feature means owning what happens after release, too.', note: 'My scope spans APIs, admin tools, storefronts, realtime, integrations, and operations. A product flow needs to be understood from end to end.', pose: 'pack' },
    { title: 'Chart the next stretch', line: 'If we worked together, where would our first 90 days take us?', note: 'This is a proposed roadmap, not a past achievement: learn the codebase, own features independently, then work toward ownership of a module.', pose: 'plan' },
    { title: 'The next chapter', line: 'So far, this story is mine. The next chapter could be ours.', note: 'Thanks for walking with me. Email me to talk or request a CV access code. You can always revisit the live projects in chapter 02.', pose: 'wave' },
  ],
}

export function storyChapter(locale: Locale, index: number): StoryChapter {
  return chapters[locale][Math.min(7, Math.max(0, index))]
}
