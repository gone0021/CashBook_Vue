@extends('layouts.cardapp')
@section('card')
<div class="card-header">{{ '科目の追加' }}</div>

<div class="card-body">
    <div class="create">
        <div>{{session('validateMsg')}}</div>
        <admin-create-kubun :m-type="admAcctType" :m-cate="admCate" :m-errors="{{ $errors }}"
            :csrf="{{json_encode(csrf_token())}}" v-on:m-chg-type="adminChgType($event)">
        </admin-create-kubun>
    </div>
</div>

@endsection
