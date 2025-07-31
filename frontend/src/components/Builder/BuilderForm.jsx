import React from 'react'
import {
  DndContext, // Context provider to enable drag and drop
  closestCenter, // Collision detection algorithm that finds the closest center
  PointerSensor, // Sensor for pointer (mouse/touch) input
  useSensor, // Hook to use a single sensor
  useSensors // Hook to combine multiple sensors
} from '@dnd-kit/core'
import {
  SortableContext, // Context to enable sorting inside DndContext
  arrayMove, // Utility to reorder items in an array
  verticalListSortingStrategy // Strategy for vertical sorting layout
} from '@dnd-kit/sortable'
import useCVStore from '../../store/cvStore' // Zustand store for CV state
import SectionWrapper from './SectionWrapper' // Wrapper component for each CV section
import sectionMap from './sectionMap' // Mapping from section id to section component

const BuilderForm = ({ className = '' }) => {
  // Setup drag sensor with activation constraint (drag starts after moving 8px)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  )

  // Get section order and setter from store
  const {
    sectionOrder,
    setSectionOrder,
    personalInfo,
    summary,
    education,
    workExperience,
    skills,
    achievements,
    projects,
    certifications,
    languages
  } = useCVStore();

  // Handle drag end event and reorder the sectionOrder array
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
      className={`w-full h-full p-2 sm:p-3 md:p-4 overflow-y-auto text-xs
        bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg
        ${className}`}
    >
      <div className="p-2 sm:p-3">
        <h2 className="text-xs sm:text-sm md:text-sm font-bold text-gray-800 mb-1">Build Your CV</h2>
      </div>

      {/* Setup DnD context and sortable context */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          {/* Render each section inside a wrapper, enabling drag handle and drop area */}
          {sectionOrder.map((id) => {
            const SectionComponent = sectionMap[id]

            // Completion logic for each section
            let completed = false;
            switch (id) {
              case 'PersonalInfo':
                completed = [personalInfo.name, personalInfo.email, personalInfo.address, personalInfo.linkedin, personalInfo.github]
                  .every(v => v && v.trim() !== '');
                break;
              case 'Summary':
                completed = !!summary && summary.trim() !== '';
                break;
              case 'Education':
                completed = Array.isArray(education) &&
                  education.length > 0 &&
                  education.every(e => e.school && e.school.trim() !== '' && e.degree && e.degree.trim() !== '');
                break;
              case 'Work':
                completed = Array.isArray(workExperience) &&
                  workExperience.length > 0 &&
                  workExperience.every(e =>
                    e.title && e.title.trim() !== '' &&
                    e.company && e.company.trim() !== '' &&
                    e.startDate && e.startDate.trim() !== '' &&
                    e.endDate && e.endDate.trim() !== '' &&
                    e.description && e.description.trim() !== ''
                  );
                break;
              case 'Skills':
                completed = Array.isArray(skills) &&
                  skills.length > 0 &&
                  skills.every(s => (typeof s === 'string' ? s.trim() !== '' : s.name && s.name.trim() !== ''));
                break;
              case 'Achievements':
                completed = Array.isArray(achievements) &&
                  achievements.length > 0 &&
                  achievements.every(a => (typeof a === 'string' ? a.trim() !== '' : a.title && a.title.trim() !== ''));
                break;
              case 'Projects':
                completed = Array.isArray(projects) &&
                  projects.length > 0 &&
                  projects.every(p => p.title && p.title.trim() !== '' && p.description && p.description.trim() !== '');
                break;
              case 'Certifications':
                completed = Array.isArray(certifications) &&
                  certifications.length > 0 &&
                  certifications.every(c =>
                    c.name && c.name.trim() !== '' &&
                    c.issuer && c.issuer.trim() !== '' &&
                    c.date && c.date.trim() !== ''
                  );
                break;
              case 'Languages':
                completed = Array.isArray(languages) &&
                  languages.length > 0 &&
                  languages.every(l => typeof l === 'string' && l.trim() !== '');
                break;
              default:
                completed = false;
            }

            return (
              <SectionWrapper key={id} id={id} completed={completed}>
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
