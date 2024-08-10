import React from 'react'
import Button from 'components/form/button'

type Props = {
  applyChange: () => void
  canClear?: boolean
  isLoading: boolean
}

function Footer({ applyChange, canClear = false, isLoading = false }: Props) {
  return (
    <div className='mt-8 flex flex-row justify-end'>
      {canClear ? (
        <button className='mr-6 rounded-sm border border-gray-500 px-2' type='button'>
          Clear
        </button>
      ) : null}

      <Button isLoading={isLoading} className='!rounded-sm' onClick={applyChange} type='button'>
        Apply
      </Button>
    </div>
  )
}

export default Footer
