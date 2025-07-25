import PersonalInfo from '../FormSections/PersonalInfo'
import Summary from '../FormSections/Summary'
import EducationForm from '../FormSections/Education'
import WorkExperience from '../FormSections/WorkExperience'
import Skills from '../FormSections/Skills'
import Achievements from '../FormSections/Achievements'
import Projects from '../FormSections/Projects'
import Certifications from '../FormSections/Certifications'
import Languages from '../FormSections/Languages'

const sectionMap = {
  PersonalInfo: PersonalInfo,
  Summary: Summary,
  Education: EducationForm,
  Work: WorkExperience,
  Skills: Skills,
  Achievements: Achievements,
  Projects: Projects,
  Certifications: Certifications,
  Languages: Languages
}

export default sectionMap
