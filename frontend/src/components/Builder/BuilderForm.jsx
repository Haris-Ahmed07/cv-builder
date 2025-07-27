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
    if (active.id !== over?.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className={`w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh] ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Build Your CV</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          {sectionOrder.map((id) => {
            const SectionComponent = sectionMap[id];
            return (
              <SectionWrapper key={id} id={id}>
                <div className="mb-6">{SectionComponent && <SectionComponent />}</div>
              </SectionWrapper>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default BuilderForm
