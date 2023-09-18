import DataForm from "./DataForm";
import PageHeader from "../bodyHeader/PageHeader";
import EditIcon from '@mui/icons-material/Edit';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import theme from '../../../../src-material-ui/themeBodyComponent';

export default function DataFormWithHeader(props) {
  let { account, setAccount, setBackdrop, setSnackbar } = props

  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title="Add Data"
        subTitle="Form design with validation"
        icon={<EditIcon fontSize="large" />}
      />
      <Paper 
        sx={{
          margin: theme.spacing(2),
          padding: theme.spacing(1)
        }}
      >
        <DataForm 
          account={account}
          setAccount={setAccount}
          setBackdrop={setBackdrop} 
          setSnackbar={setSnackbar}
        />
      </Paper>
    </ThemeProvider>
  ) 
}