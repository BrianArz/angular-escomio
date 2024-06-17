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
}
