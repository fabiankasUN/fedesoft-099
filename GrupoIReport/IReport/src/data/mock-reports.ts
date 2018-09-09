import { Report } from '../interfaces/Report';


export const REPORTS: Report[] = [
  {
    id: 0,
    title : "Hueco peligroso",
    description : "Hay un hueco en la calle que va a matar a alguien ayuda porfa!!!",
    img : "https://static.iris.net.co/semana/upload/images/2017/4/4/520926_1.jpg",
    rating : 5,
    solved : false,
    lat : 4.6373746,
    lng:-74.1011716,
    icon : "office/40/000000/crashed-car"
},
{
  id: 1,
  title : "Arbol caido",
  description : "Hay un arbol que se cayo esta mañana por y no se que hacer alguien me ayuda!",
  img : "http://www.eltiempo.com/contenido///bogota/IMAGEN/IMAGEN-15324359-2.png",
  rating : 15,
  solved : true,
  lat : 4.6565372,
  lng:-74.1074137,
  icon:"doodle/40/000000/tree"
  
},
{
  id: 2,
  title : "Hermoso paisaje",
  description : "Una buena tarde en el jardin botanico de bogota aprendiendo de nuestra flora nativa y como protejerla.",
  img : "http://www.bogota.gov.co/sites/default/files/u38/Herbal%20Jard%C3%ADn%20Botanico.jpg",
  rating : 30,
  solved : true,
  lat : 4.6683418,
  lng:-74.1008429,
  icon:"40/000000/nature"
  
},
{
  id: 3,
  title : "Desorden todal",
  description : "Hay un arbol que se cayo esta mañana por y no se que hacer alguien me ayuda!",
  img : "http://www.eldiario.com.co/uploads/galleryNews/81830/photos/2-FOTO-2-carrera-12-A-calle-11-Corocito-copia.jpg",
  rating : -124,
  solved : false,
  lat : 4.6667292,
  lng:-74.1026156,
  icon:"dusk/40/000000/garbage-truck"
  
}
];