import { Suspense } from 'react'
import ProposalPage from '@/components/proposal/proposal-page'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ProposalPage />
    </Suspense>
  )
}
