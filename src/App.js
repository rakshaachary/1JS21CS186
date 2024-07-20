import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { CardContent, CardHeader, Card, Box, Typography } from "@mui/material";
import TableView from './components/TableView';

function App() {
  const [companies, setCompanies] = useState(["AMZ", "FLP", "SNP", "MYN", "AZO"]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  const [masterData, setMasterData] = useState([]);

  useEffect(() => {
    let tempCompanies = [...masterData]
    companies.forEach((company) =>
      getAuth().then((response) => {
        fetchData(company, response?.access_token).then((resp) => {
          tempCompanies = [...tempCompanies, { company: company, data: resp }]
          setMasterData(tempCompanies);
        })
      }).catch((error) => console.error(error))
    )
  }, []);


  const getAuth = async () => {
    const body = {
      "companyName": "JSS ACADEMY OF TECHNICAL EDUCATION ",
      "clientID": "210b782e-34be-481e-8f92-b8649a804c47",
      "clientSecret": "zzVLLtkdVjtJSUgv",
      "ownerName": "Raksha Achary",
      "ownerEmail": "rakshaachary6@gmail.com",
      "rollNo": "1JS21CS186"
    }

    const res = await axios.post(
      'http://20.244.56.144/test/auth', body
    )
    return res.data;
  };

  const fetchData = async (company, accessToken) => {
    const res = await axios.get(
      `http://20.244.56.144/test/companies/${company}/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );
    return res.data;
  };

  return (
    <Box>
      <Typography p={4} variant="h4">
        Company Catalogue
      </Typography>
      {masterData.map((values) => (
        <Box p={4}>
          <Card>
            <CardHeader title={`Company Name: ${values.company}`} />
            <CardContent>
              <TableView data={values.data} />
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default App;
