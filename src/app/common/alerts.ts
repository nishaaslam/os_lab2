import Swal from 'sweetalert2';
export const MessageTypes = {
    error: "Error",
    info: "Info",
    failure: "Failure",
    success: "Success",
    warning: "Warning",
    question: "Question"
}

export const ResultMessages = {
    serverError: "Internal Server Error",
    success: "Added Successfully",
    fileNotFound: "Sorry, we are unable to download this file for you.",
    fileSizeLimit: "File size can not be more than 1 MB.",
    fileExtension: "File Format not supported",

}

export function showSuccessAlert(message: string, title: string = 'Success!') {
    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        customClass: {
            confirmButton: 'custom-alert-btn',
        },
    });
}

export function showErrorAlert(message: string, title?: string) {
    Swal.fire({
        title: title != null ? title : MessageTypes.error,
        text: message,
        icon: 'error',
        customClass: {
            confirmButton: 'custom-alert-btn',
        },
    });
}






































