import CardMedia from '@mui/material/CardMedia';

export default function PostMedia({image}) {
    return(
        <CardMedia
                    component="img"
                    height="300"
                    image={image}
                />
    )
}