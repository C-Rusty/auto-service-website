import Modal from '@mui/material/Modal';
import '../../styles/client/ClientContent/Modal.scss';
import { Dispatch, SetStateAction } from 'react';
import { Box, Button } from '@mui/material';

const MoadlNotice = (
    {
        selectedDate, selectedTime, isSubmit, setIsSubmit
    } 
    : 
    {
        selectedDate: string, 
        selectedTime: string,
        isSubmit: boolean,
        setIsSubmit: Dispatch<SetStateAction<boolean>>,
    }) => {

    const options: Object = {weekday: "long", year: 'numeric', month: 'long', day: "numeric"};

    const handleModal = () => {
        setIsSubmit(!isSubmit);
        window.location.reload();
    };

    return (
        <Modal 
            open={isSubmit}
            onClose={handleModal}
        >
            <Box className='modal'>
                <div className='modal__info'>
                    <span>Вы успешно записаны на:</span>
                    <span>{new Date(selectedDate).toLocaleDateString('ru-RU', options)} в {selectedTime}</span>
                </div>
                <Button onClick={handleModal} className='modal__btn'>Закрыть</Button>
            </Box>
        </Modal>
    );
};

export default MoadlNotice;