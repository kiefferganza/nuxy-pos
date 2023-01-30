import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { faUsersCog } from '@fortawesome/free-solid-svg-icons/faUsersCog'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck'

library.add(faSpinner)
library.add(faFolderOpen)
library.add(faHome)
library.add(faChartLine)
library.add(faChevronRight)
library.add(faChevronDown)
library.add(faUsersCog)
library.add(faCircle)
library.add(faEllipsisVertical)
library.add(faPenToSquare)
library.add(faRightFromBracket)
library.add(faListCheck)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
