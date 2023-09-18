import DataAndImage from "./DataAndImage";
import PageHeader from "../bodyHeader/PageHeader";
import EditIcon from '@mui/icons-material/Edit';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import theme from '../../../../src-material-ui/themeBodyComponent';

export default function DataFormWithHeader(props) {
  let { account, setAccount, setBackdrop } = props

  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title="Datos de los Representantes"
        subTitle="Formulario de Registro"
        icon={<EditIcon fontSize="large" />}
      />
      <Paper 
        sx={{
          margin: theme.spacing(2),
          padding: theme.spacing(1)
        }}
      >
        <DataAndImage
          account={account}
          setBackdrop={setBackdrop} 
        />
      </Paper>
    </ThemeProvider>
  ) 
}