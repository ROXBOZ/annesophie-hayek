import blockContent from './blockContent'
import faq from './faq'
import home from './home'
import imageSection from './imageSection'
import {langBlock} from './langBlock'
import {langSlug} from './langSlug'
import {langString} from './langString'
import {langText} from './langText'
import linkButton from './LinkButton'
import menus from './menus'
import page from './page'
import textSection from './textSection'
import userProfile from './userProfile'

export const schemaTypes = [
  userProfile,
  home,
  langString,
  blockContent,
  langSlug,
  langText,
  langBlock,
  page,
  menus,
  textSection,
  faq,
  linkButton,
  imageSection,
]
