import CardMedia from '@mui/material/CardMedia';

export default function PostMedia({image, onImageClick}) {
    return(
        <CardMedia
                onClick={onImageClick}
                component="img"
                height="300"
                image={image}
                sx={{cursor: 'pointer'}}
                />
    )
}