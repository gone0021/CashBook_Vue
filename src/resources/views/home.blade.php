@extends('layouts.cardapp')
@section('card')

<div class="card-header">Home</div>

<div class="card-body">
    <form>
        @csrf
    </form>
    <div class="mb-3">
        <div class="my-2">● 新規作成</div>
        <div class="btn btn-sticky ml-2 mb-3" id="newAccount" v-on:click="newAccount">
            簿記風
        </div>

        <div class="ml-2">
            <div class="btn btn-sticky mr-3" id="newExpense" v-on:click="newExpense">
                支出のみ
            </div>

            <div class="btn btn-sticky" id="newIncome" v-on:click="newIncome">
                収入のみ
            </div>
        </div>
    </div>

    <div class="mb-3">
        <div class="mb-2">● 収支一覧</div>
        <div class="mb-2 ml-2">
            <a href="{{ route('items/index') }}" class="btn btn-sticky mb-2" id="btNewAccounting">
                家計簿
            </a>
        </div>
        <div class="mb-2 ml-2">
            <a href="{{ url('calendar/index') }}" class="btn btn-sticky mb-2">
                カレンダー表示
            </a>
        </div>
    </div>

    <div class="mb-3">
        <div class="mb-1">● 設定</div>
        <div class="mb-2">
            <a href="{{ route('users') }}">
                アカウント設定
            </a>
        </div>

        @if (Auth::user()->is_admin == '1')
        <div class="mb-2">
            <a href="{{ route('admin/index') }}">
                管理者画面
            </a>
        </div>
        @endif
    </div>

    <div class='glayLayer' v-if="glay" v-on:click="glayLayer"></div>
    <modal-account v-show="modalAccount" :csrf="{{json_encode(csrf_token())}}" :m-date="date" :m-cate="category"></modal-account>
    {{-- <modal-nomal :csrf="{{json_encode(csrf_token())}}" :nm-obj="nmObj" :m-cate="category" :key="nmObj.name"></modal-nomal> --}}
    <modal-nomal v-show="modalNomal" :csrf="{{json_encode(csrf_token())}}" :m-date="date" :nm-obj="nmObj" :m-cate="category" :m-kubun="kubun"></modal-nomal>

    {{-- @include('components.expense_modal') --}}
    {{-- @component ('components.input_account')
    @slot('today',$today)
    @slot('categoryAll',$categoryAll)
    @endcomponent

    @component ('components.input_nomal')
    @slot('today',$today)
    @slot('categoryAccet',$categoryAccet)
    @slot('categoryCost',$categoryCost)
    @slot('categoryProfit',$categoryProfit)
    @endcomponent

    @component ('components.input_msg')
    @endcomponent --}}

    {{-- section ここまで --}}
    @endsection

</div>
