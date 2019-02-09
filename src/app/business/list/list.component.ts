import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    formGroup: FormGroup;
    errorMsg: {[key: string]: any};

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        // this.initForm();
        // this.initErrorMsg();
    }

    // 初始化表单
    initForm() {
        this.fb.group({
            counter: [0]
        });
    }

    // 初始化验证信息
    initErrorMsg() {
        this.errorMsg = {
            'counter': {
                'counterRange': '取值范围0~10'
            }
        };
    }
}
