<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{

    function register(Request $req){
        $user = new User;
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return $user;

    }

    function login(Request $req){

        if (!$req->filled(['email', 'password'])) {
            return ['error' => 'Please provide email and password.'];
        }

        $user = User::where('email',$req->email)->first();
        if(!$user||!Hash::check($req->password,$user->password)){
            return ["error"=>"Email or password is not mathch"];
        }
        return $user;
    }


}

