import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertService {

    constructor() { }

    Toast = Swal.mixin({
        toast: true,
        position: 'top',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    success(title: string) {
        this.Toast.fire({
            icon: 'success',
            title: title,
        })
    }

    error(title: string) {
        this.Toast.fire({
            icon: 'error',
            title: title,
        })
    }

    confirmationAlert(title: string, text: string, confirmButtonTxt: string, cancelButtonText: string):  Promise<any> {
        return Swal.fire({
            title: title,
            text: text,
            showCancelButton: true,
            confirmButtonText: confirmButtonTxt,
            cancelButtonText: cancelButtonText,
            reverseButtons: true,
            icon: "info",
            customClass: {
                confirmButton: 'btn escomio-bg-saphire-blue escomio-txt-snow',
                cancelButton: 'btn escomio-bg-cyan-process escomio-txt-snow'
            }
        });
    }
}
