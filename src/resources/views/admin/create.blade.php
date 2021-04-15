@extends('layouts.cardapp')
@section('card')
<div class="card-header">{{ '科目の追加' }}</div>

<div class="card-body">
    <div class="create"></div>
    <admin-create-kubun :p-type="cAcctType" :p-cate="cCate" :p-error-msg="errorMsg" :p-errors="{{ $errors }}"
        :csrf="{{json_encode(csrf_token())}}" v-on:chg-type="adminChgType($event)"
        v-on:admin-valid="adminValid($event,args)">
    </admin-create-kubun>
</div>
<div class='glayLayer' v-if="glay" v-on:click="glayLayer"></div>
<modal-msg v-if="modalMsg"></modal-msg>

@endsection
