import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Card from 'react-bootstrap/Card';

type CarousalProps = {
  trimImgPath:string[];
};

const Carousal: React.FC<CarousalProps> = ({ trimImgPath }) => {
  return (
    <Carousel>
      {trimImgPath.map((item) => {
        return (
          <Carousel.Item key={item}>
            <Card.Img variant="top" className="img-style" src={item} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Carousal;
