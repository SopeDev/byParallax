import logo from '../images/logo-white.png'

import menu from '../images/menu.jpg'
import menuThumbnail from '../video/menu_thumbnail.jpg'

import slide1 from '../images/slides/slide1.jpg'
import slide2 from '../images/slides/slide2.jpg'
import slide3 from '../images/slides/slide3.jpg'
import slide4 from '../images/slides/slide4.jpg'
import slide5 from '../images/slides/slide5.jpg'

import thumbnail1 from '../images/projects/ios/thumbnail.jpg'
import thumbnail2 from '../images/projects/yha/thumbnail.jpg'
import thumbnail3 from '../images/projects/aquelarre/thumbnail.jpg'
import thumbnail4 from '../images/projects/julian/thumbnail.jpg'
import thumbnail5 from '../images/projects/s55/thumbnail.jpg'
import thumbnail6 from '../images/projects/photo/thumbnail.jpg'
import thumbnail7 from '../images/projects/logos/thumbnail.jpg'
import thumbnail8 from '../images/projects/provita/thumbnail.jpg'

import cover1 from '../images/projects/ios/cover.jpg'
import cover2 from '../images/projects/yha/cover.jpg'
import cover3 from '../images/projects/aquelarre/cover.jpg'
import cover4 from '../images/projects/julian/cover.jpg'
import cover5 from '../images/projects/s55/cover.jpg'
import cover6 from '../images/projects/photo/cover.jpg'
import cover7 from '../images/projects/logos/cover.jpg'
import cover8 from '../images/projects/provita/cover.jpg'

import contact from '../images/contact.jpg'

import iosstory1 from '../images/projects/ios/story1.jpg'
import iosstory2 from '../images/projects/ios/story2.png'
import iosstory3 from '../images/projects/ios/story3.jpg'

import yhastory1 from '../images/projects/yha/story1.png'
import yhastory2 from '../images/projects/yha/story2.png'
import yhastory3 from '../images/projects/yha/story3.png'
import yhastory4 from '../images/projects/yha/story4.png'
import yhastory5 from '../images/projects/yha/story5.png'
import yhastory6 from '../images/projects/yha/story6.jpg'
import yhaflipper1 from '../images/projects/yha/flipper1.jpg'
import yhaflipper2 from '../images/projects/yha/flipper2.jpg'
import yhaflipper3 from '../images/projects/yha/flipper3.jpg'

import navbackground from '../video/menu.mp4'

class MediaStore {
	logo = [logo]
	menu = [menu, menuThumbnail]
	slides = [slide1, slide2, slide3, slide4, slide5]
	thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5, thumbnail6, thumbnail7, thumbnail8]
	covers = [cover1, cover2, cover3, cover4, cover5, cover6, cover7, cover8]
	contact = [contact]
	ios = { story: {iosstory1, iosstory2, iosstory3} }
	yha = { story: {yhastory1, yhastory2, yhastory3, yhastory4, yhastory5, yhastory6}, flipper: {yhaflipper1, yhaflipper2, yhaflipper3} }
	videos = [navbackground]
}

export default new MediaStore