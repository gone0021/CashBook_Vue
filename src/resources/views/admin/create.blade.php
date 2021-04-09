@extends('layouts.cardapp')
@section('card')
<div class="card-header">{{ '科目の追加' }}</div>

<div class="card-body">
    <div class="create">
        <form action="{{ route('admin/store') }}" method="post" class="">
            @csrf
            {{-- <div>{{session('validateMsg')}}</div> --}}
            <admin-create-kubun :m-type="admAcctType" :m-cate="admCate" :errors="{{ $errors }}"
                v-on:m-chg-type="adminChgType($event)">
            </admin-create-kubun>
        </form>
    </div>
</div>

@endsection
