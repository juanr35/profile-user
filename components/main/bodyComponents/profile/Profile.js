import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from './src/ProTip';

export default function Profile(props) {

  const { onClickHandle, name } = props;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '40vh',
          my: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" align='center' gutterBottom>
          Hola {name}. Bienvenido al portal
        </Typography>
        <Typography variant="h4" component="h1" align='center' gutterBottom>
          de registro de la Academia Emeritense F.C
        </Typography>
        <ProTip />
        <Box maxWidth="sm">
          <Button variant="contained" onClick={onClickHandle} >
            Ingresar Datos
          </Button>
        </Box>
      </Box>
    </Container>
  );
};