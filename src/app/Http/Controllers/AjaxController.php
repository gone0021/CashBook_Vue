<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Item;
use App\Models\Category;
use App\Models\Kubun;

class AjaxController extends Controller
{
    public function getCategory(Request $req)
    {
        $ret = Category::all();
        return $ret;
    }

    public function getKubun(Request $req)
    {
        $ret = Kubun::all();
        return $ret;
    }

    public function getCategoryByAccountType(Request $req)
    {
        $ret = Category::where('account_type', $req->account_type)->get();
        return $ret;
    }

    public function getCategoryIncome(Request $req)
    {
        $ret = Category::where('account_type', 2)->get();
        return $ret;
    }

    public function getCategoryExpense(Request $req)
    {
        $ret = Category::where('account_type', 1)->get();
        return $ret;
    }

    public function getKubunByCategoryId(Request $req)
    {
        $ret = Kubun::where('category_id', $req->category_id)->get();
        return $ret;
    }

    public function getKubunByCategoryIdGet(Request $req)
    {
        $ret = Kubun::where('category_id', $req->category_id)->get();
        return $ret;
    }
}
