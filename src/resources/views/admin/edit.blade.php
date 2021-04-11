@extends('layouts.cardapp')
@section('card')
<div class="card-header">{{ '科目の編集・削除'}}</div>

<div class="card-body">
    <div class="edit">

        {{-- <div>{{session('validateMsg')}}
    </div> --}}
    <admin-edit :p-type="cAcctType" :p-cate="cCate" :p-kubun="cKubun" :p-errors="{{ $errors }}"
        :csrf="{{json_encode(csrf_token())}}" v-on:chg-type="adminChgType($event)"
        v-on:chg-cate="adminChgCate($event)">
    </admin-edit>
</div>
</div>

@endsection
