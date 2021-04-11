@extends('layouts.cardapp')
@section('card')
<div class="card-header">{{ '科目の編集・削除'}}</div>

<div class="card-body">
    <div class="edit">

        {{-- <div>{{session('validateMsg')}}
    </div> --}}
    <admin-edit :m-type="admAcctType" :m-cate="admCate" :m-kubun="admKubun" :m-errors="{{ $errors }}"
        :csrf="{{json_encode(csrf_token())}}" v-on:m-chg-type="adminChgType($event)"
        v-on:m-chg-cate="adminChgCate($event)">
    </admin-edit>
</div>
</div>

@endsection
