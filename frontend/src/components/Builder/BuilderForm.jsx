import React from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import useCVStore from '../../store/cvStore'
import SectionWrapper from './SectionWrapper'
import sectionMap from './sectionMap'

const BuilderForm = ({ className = '' }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  )

  const { sectionOrder, setSectionOrder } = useCVStore()

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div
      className={`w-full h-full p-4 overflow-y-auto 
        bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg
        ${className}`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">Build Your CV</h2>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          {sectionOrder.map((id) => {
            const SectionComponent = sectionMap[id]
            return (
              <SectionWrapper key={id} id={id}>
                <div className="mb-6">{SectionComponent && <SectionComponent />}</div>
              </SectionWrapper>
            )
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default BuilderForm
