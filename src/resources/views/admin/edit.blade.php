@extends('layouts.cardapp')
@section('card')
<div class="card-header">{{ '科目の編集・削除'}}</div>

<div class="card-body">
    <div class="edit">
        <form action="{{ route('admin/update') }}" method="post" class="">
            @csrf
            {{-- <div>{{session('validateMsg')}}</div> --}}
            <admin-edit :m-type="admAcctType" :m-cate="admCate" :m-kubun="admKubun" :errors="{{ $errors }}"
                v-on:m-chg-type="adminChgType($event)" v-on:m-chg-cate="adminChgCate($event)">
            </admin-edit>
        </form>
    </div>
</div>

@endsection
