import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Typography,
} from '@mui/material';

const ResultsTable = ({ groupedResults }) => {
  return (
    <>
      {Object.keys(groupedResults).map((tableName, index) => (
        <Card key={index} style={{ marginBottom: '20px', padding: '20px' }}>
          <Typography variant='h6' gutterBottom>
            {tableName}
          </Typography>
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {groupedResults[tableName].length > 0 &&
                    Object.keys(groupedResults[tableName][0]).map((key) => {
                      if (
                        key !== 'tableName' &&
                        key !== 'id' &&
                        key !== 'matchAttribute'
                      ) {
                        return <TableCell key={key}>{key}</TableCell>;
                      }
                      return null;
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedResults[tableName].map((item, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.keys(item).map((key) => {
                      if (
                        key !== 'tableName' &&
                        key !== 'id' &&
                        key !== 'matchAttribute'
                      ) {
                        return (
                          <TableCell key={key}>
                            {Array.isArray(item[key])
                              ? item[key].join(', ')
                              : item[key]}
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ))}
    </>
  );
};

export default ResultsTable;
