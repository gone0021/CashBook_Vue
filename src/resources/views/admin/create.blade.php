@extends('layouts.cardapp')
@section('card')
<div class="card-header">{{ '科目の追加' }}</div>

<div class="card-body">

    <div class="create">
        @if (session('validateMsg'))
        <input type="hidden" name="createValidateMsg" value="{{ session('validateMsg') }}">
        @endif

        <form action="{{ route('admin/store') }}" method="post" class="">
            @csrf
            <div class="checkbox mb-3">
                <input type="radio" name="mode" value="1" class="mr-1" id="createSelect1" v-model="admRadio" :click="createCate">
                <label for="createSelect1" class="form-check-label mr-3">科目のみ作成</label>

                {{-- ロジック残し --}}
                {{-- <input type="radio" value="2" name="mode" class="mr-1" id="createSelect2" @if (session('validateMsg') == 'createKubun') checked @endif> --}}

                <input type="radio" name="mode" value="2" class="mr-1" id="createSelect2" v-model="admRadio" :click="createKubun">

                <label for="createSelect2" class="form-check-label mr-3">小科目のみ作成</label>
            </div>

            {{-- 科目のみ --}}
            <admin-create-cate  v-if="admRadio == 1" :m-type="admAcctType" :m-dis="disCrtCate"></admin-create-cate>

            {{-- <div class="crateCategory mb-3" v-if="admRadio ==='category'">
                <div class="createAccountType mr-3">
                    <label for="createAccountType">科目区分</label>
                    <select name="account_type" id="createAccountType"
                        class="form-control @error('account_type')is-invalid @enderror" required>
                        <option id="option0" value="">---</option>


                        <option v-for="(typen i) in accountType" :value="type.id" :key="'type' + i">
                            {{ type }}
                        </option>

                        @foreach ($accountType as $k => $v)
                        <option value="{{$k}}">{{$v}}</option>
                        @endforeach
                    </select>

                    <div class="invalid-feedback">
                        @error('account_type')
                        <span id="createErrorAccountType">
                            {{ $message }}
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="createCategory">
                    <label for="createCategory">科目名</label>
                    <input type="text" name="category_name" id="createCategory"
                        class="form-control @error('category_name')is-invalid @enderror"
                        value="{{ old('category_name') }}" required>

                    <div class="invalid-feedback">
                        @error('category_name')
                        <span id="createErrorCategoryName">
                            {{ $message }}
                        </span>
                        @enderror
                    </div>
                </div>
            </div> --}}

            {{-- 小科目のみ --}}
            <admin-create-kubun v-if="admRadio == 2" :m-type="admAcctType" :m-cate="admCate" :m-dis="disCrtKubun" @m-chg-type="adminChgType($event)" ></admin-create-kubun>

            {{-- <div class="crateCategory" v-if="admRadio ==='kubun'">
                <div class="createAccountType align-top mr-3">
                    <label for="createAccountType">科目区分</label>
                    <select name="account_type" id="createAccountType"
                        class="form-control @error('account_type')is-invalid @enderror" required>
                        <option id="option0" value="">---</option>
                        @foreach ($accountType as $k => $v)
                        <option value="{{$k}}">{{$v}}</option>
                        @endforeach
                    </select>

                    <div class="invalid-feedback">
                        @error('account_type')
                        <span id="createErrorAccountType">
                            {{ $message }}
                        </span>
                        @enderror
                    </div>
                </div>
                <div class="createSelectCategory mr-3">
                    <label for="createSelectCategory">科目名</label>
                    <select name="category_id" id="createSelectCategory"
                        class="form-control @error('category_id')is-invalid @enderror">
                        <option value="" id="option1" selected>---</option>
                    </select>

                    <div class="invalid-feedback">
                        @error('category_id')
                        <span id="createErrorCategoryId">
                            {{ $message }}
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="crateCategory">
                    <div class="createKubunName mb-3">
                        <label for="createKubunName">小科目名</label>
                        <input type="text" name="kubun_name" id="createKubunName"
                            class="form-control mr-1 @error('kubun_name')is-invalid @enderror"
                            value="{{ old('kubun_name') }}">

                        <div class="invalid-feedback">
                            @error('kubun_name')
                            <span id="createErrorKubunName">
                                {{ $message }}
                            </span>
                            @enderror
                        </div>
                    </div>
                </div>
            </div> --}}

            <div class="col-md-10">
                <input type="submit" name="" id="submit" class="btn btn-info mr-2" value="{{ __('Send') }}">
                <a href="{{ route('admin/index') }}" class="btn btn-light">
                    {{ __('Return') }}
                </a>
            </div>
        </form>
    </div>



</div>

@endsection
