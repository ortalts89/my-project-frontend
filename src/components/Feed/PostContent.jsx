import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function PostContent({caption, hashtags}) {
    return (
        <CardContent sx={{height: '40px', padding: '5px 10px'}}>
            <Typography variant="body2" color="text.secondary" >
                {caption}
                <br/>
                {hashtags}
            </Typography>
        </CardContent>
    )
}