import { useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

function ImportFromXlsx({ setColDefs, data, colDefs, setData }: any) {
	const naivate = useNavigate();
	const EXTENSIONS = ['xlsx', 'xls', 'csv'];

	const getExention = (file: any) => {
		const parts = file.name.split('.');
		const extension = parts[parts.length - 1];
		return EXTENSIONS.includes(extension); // return boolean
	};

	const convertToJson = (headers: any, fileData: any) => {
		const rows: any = [];
		fileData.forEach((row: any) => {
			let rowData: any = {};
			row.forEach((element: any, index: number) => {
				rowData[headers[index]] = element;
			});
			if (Object.keys(rowData)[0] !== null) {
				rows.push(rowData);
			}
		});
		setData(rows);

		// return rows;
	};

	useEffect(() => {
		console.log(data);
	}, [data]);

	const importExel = (e: any) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = (e: any) => {
			// parse data
			const bstr = e.target.result;
			const workBook = XLSX.read(bstr, { type: 'binary' });

			//get first sheet
			const workSheetName = workBook.SheetNames[0];
			const workSheet = workBook.Sheets[workSheetName];

			// convert to array
			const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

			const headers: any = fileData[0];
			fileData.splice(0, 1);

			const heads = headers.map((head: any) => ({ title: head, field: head }));
			setColDefs(heads);

			// console.log(fileData);
			convertToJson(headers, fileData);
			// console.log(data);
		};

		if (file) {
			if (getExention(file)) {
				reader.readAsBinaryString(file);
			} else {
				alert('Invalid file input, Select Excel, CSV file');
			}
		} else {
			setData([]);
			setColDefs([]);
		}
	};

	return (
		<>
			{/* <input type='file' onChange={importExel} /> */}

			<input
				type='file'
				className='file-input w-full max-w-xs'
				onChange={importExel}
			/>

			{/* {colDefs?.map((c: any, i: number) => (
				<p key={i}>{c.title}</p>
			))} */}
		</>
	);
}

export default ImportFromXlsx;
