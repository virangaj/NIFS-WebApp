import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';

import Ripple from '../../components/Ripple';
import CustomeDataPicker from '../../components/DataPicker';
import { generateID } from '../../constant/generateId';
import IEmployeeData from '../../types/EmployeeData';
import EmployeeService from '../../services/admin/EmployeeService';
import IDesignationData from '../../types/DesignationData';
import IDivisionData from '../../types/DivisionData';

function ResignationRequest() {
	return <p>Hi</p>;
}

export default ResignationRequest;
