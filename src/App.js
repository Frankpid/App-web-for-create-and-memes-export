import {useState} from "react"
import styled from "styled-components"
import html2canvas from "html2canvas"
import './App.css';

// styles
const Container = styled.div`
  width: 1280px;
  max-width: 94%;
  margin: 0 auto;
  display: flex;
  column-count: 2;
  column-gap: 30px;

  @media(max-width: 600px){
    column-count: 1;
    flex-direction: column;
    > div {
      width: 100%!important;
    }
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 15px auto 20px auto;
  display: table;
  max-width: 94%;
  @media(max-width: 600px){
    font-size: 22px;
  }
`;

const Filters = styled.div`
  width: 35%;
  > *{
    width: 100%;
    margin: 8px 0;
  }
  select{
    height: 50px;
    padding: 10px;
    background: #eee;
    border-radius: 10px;
    margin-top: 0;
  }
  p{
    background: #28a745;
    padding: 6px 10px;
    box-sizing: border-box;
    color: #fff;
    border-radius: 10px;
  }
`;

const WrapperImage = styled.div`
  position: relative;
  width: 65%;
  p{
    width: 90%;
    position: absolute;
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    left: 0;
    right: 0;
    margin: 0 auto;
    word-break: break-word;
  }
  .text-top{
    top: 50px;
  }
  .text-bottom{
    bottom: 90px;
  }
  img{
    width: 100%;
    max-widh: 100%;
  }
  @media (max-width: 600px){
    p{
      font-size: 30px;
    }
    .text-top{
      top: 20px;
    }
    .text-bottom{
      bottom: 60px;
    }
  }
`;

const Input = styled.input`
  box-sizing: border-box; 
  height: 50px;
  border-radius: 10px;
  border: 1px solid #333;
  padding: 6px 10px;
`;

const Button = styled.button(props => ({
  boxSizing: "border-box", 
  height: "50px",
  borderRadius: "10px",
  backgroundColor: props.buttonColor,
  fontWeight: props.fontWeight
}));

function App() {

  // use states
  const 
    [linea1, setLinea1] = useState(''),
    [linea2, setLinea2] = useState(''),
    [imagen, setImagen] = useState('fire');

  // functions
  const changeLinea1 = (e) => {
    let value = e.target.value
    setLinea1(value)
  }

  const changeLinea2 = (e) => {
    let value = e.target.value
    setLinea2(value)
  }

  const changeImagen = (e) => {
    let value = e.target.value
    setImagen(value)
  }
  
  const exportarMeme = (e) => {
    // verificamos que los 2 campos de texto esten información y como minimo haya mas de 5 caracteres.
    if( linea1.length<=4 || linea2.length<=4 ) return false

    // Instanciamos una variable que va contener el tiempo en milisegundos para agregar al nombre de la imagen.
    let 
      newData = new Date(),
      dateTime = newData.getTime()

    // Instanciamos la Imagen con html2canvas con el id #meme y luego creamos un vinculo a:href para exportarlo
    html2canvas(document.querySelector('#meme')).then(imagenMeme => {
      let 
      imageUrl = imagenMeme.toDataURL('image/webp', 1.0),
      aElem = document.createElement('a');

      aElem.href = imageUrl;
      aElem.download = `meme-${dateTime}`;

      aElem.click();
    });

    // Esta instrucción la ponemos para que no recargue la pagína el evento submit del formulario.
    e.preventDefault();
  }
  
  return (
    <div className="App">
      <Title className="title">Aplicación Web para Exportar Memes</Title>

      <form onSubmit={exportarMeme}>
        <Container>
          <Filters className="filters">
            <select onChange={changeImagen}>
              <option value="fire">Casa en Llamas</option>
              <option value="futurama">Futurama</option>
              <option value="history">History Channel</option>
              <option value="matrix">Matrix</option>
              <option value="philosoraptor">Philosoraptor</option>
              <option value="smart">Smart Guy</option>
            </select>
            <br />

            <Input type="text" placeholder="Texto arriba" onChange={changeLinea1} required minLength={5} maxLength={40} />
            <Input type="text" placeholder="Texto abajo" onChange={changeLinea2} required minLength={5} maxLength={40} />
            <p>Descargaremos una imagen en formato WebP, recomendado por Google, que ayuda mucho en el tiempo de carga de la web y en el SEO.</p>
            <p>WebP de Google es un formato de imagen moderno que se trata de proporcionar una mejor compresión sin pérdidas y con pérdida de imágenes en la web.</p>
            <Button type="submit" buttonColor="#ddd" fontWeight="bold">Descargar Meme</Button>
          </Filters>

          <WrapperImage className="wrapper-image" id="meme">
            <p className="text-top">{linea1}</p>
            <p className="text-bottom">{linea2}</p>

            <img alt="Imagen" src={`./img/${imagen}.jpg`} />
          </WrapperImage>
        </Container>
      </form>
    </div>
  );
}

export default App;
