import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private supabase: SupabaseClient;

  constructor(){
    this.supabase = createClient(
      environment.supabaseConfig.url, 
      environment.supabaseConfig.apikey
      );
  }

  async uploadFile(file: File, username:string, fileName:string){
    const {data, error } = await this.supabase.storage.from('instapic').upload(`${username}/${fileName}`, file) 

    if(error){

    }else { 
      
    }
    const resp = await this.supabase.storage.from('instapic').getPublicUrl('')
  }
}
