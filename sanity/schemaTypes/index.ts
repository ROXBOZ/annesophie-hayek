import TextSection from './TextSection'
import blockContent from './blockContent'
import home from './home'
import {langBlock} from './langBlock'
import {langSlug} from './langSlug'
import {langString} from './langString'
import {langText} from './langText'
import menus from './menus'
import page from './page'
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
  TextSection,
]
