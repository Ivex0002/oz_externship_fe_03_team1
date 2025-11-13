export type ReviewDetailSkeletonProps = {
  itemCount?: number
}

export const ReviewDetailSkeleton = ({
  itemCount = 3,
}: ReviewDetailSkeletonProps) => {
  return (
    <div className="w-[672px]" role="status" aria-busy aria-live="polite">
      <main className="flex animate-pulse flex-col items-center p-6">
        <ReviewDetailAverageSkeleton />

        <div className="transparent-scrollbar flex h-[326px] w-full flex-col overflow-scroll">
          {Array.from({ length: itemCount }).map((_, i) => (
            <ReviewDetailCardSkeleton key={i} isFirst={i === 0} />
          ))}
        </div>
      </main>

      <footer className="flex justify-center border-t border-gray-200 p-6">
        <ButtonSkeleton widthClass="w-40" />
      </footer>
    </div>
  )
}

const ReviewDetailAverageSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center gap-2 border-b border-gray-200 pb-6 text-gray-600">
      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
        <div className="h-6 w-24 rounded bg-gray-200" aria-hidden />
        <div className="h-6 w-10 rounded bg-gray-200" aria-hidden />
      </div>
      <div className="h-4 w-32 rounded bg-gray-200" aria-hidden />
    </div>
  )
}

interface ReviewDetailCardSkeletonProps {
  isFirst: boolean
}

const ReviewDetailCardSkeleton = ({
  isFirst,
}: ReviewDetailCardSkeletonProps) => {
  return (
    <div
      className={[
        'flex w-full flex-col gap-3 border-t border-gray-100 py-6',
        isFirst ? 'border-t-0' : '',
      ].join(' ')}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 rounded bg-gray-200" aria-hidden />
          <div className="h-5 w-10 rounded bg-gray-200" aria-hidden />
          <div className="h-5 w-14 rounded bg-gray-200" aria-hidden />
        </div>
        <div className="h-4 w-28 rounded bg-gray-200" aria-hidden />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-gray-200" aria-hidden />
        <div className="h-4 w-2/3 rounded bg-gray-200" aria-hidden />
      </div>
    </div>
  )
}

interface ButtonSkeletonProps {
  widthClass?: string
}

const ButtonSkeleton = ({ widthClass = 'w-32' }: ButtonSkeletonProps) => {
  return (
    <span className={`inline-flex ${widthClass}`} aria-hidden>
      <span className="h-10 w-full rounded-lg bg-gray-200" />
    </span>
  )
}

export default ReviewDetailSkeleton
